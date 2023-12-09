const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { SIGNUP } = require("../Models/SignupModel")

// Environment variable configuration
dotenv.config()

// Login and JWT Authentication
const jwt_key = process.env.jwt_key

const authentication = async (req, res) => {
    const token = req.headers.token
    try {
        if (!token) {
            return res.status(401).json({ authentication: false })
        } else {
            const decodedToken = jwt.verify(token, jwt_key)
            if (decodedToken) {
                const findUserData = await SIGNUP.findOne({ _id: decodedToken.uid })
                if (findUserData) {
                    const data =
                    {
                        uid: findUserData._id,
                        name: findUserData.name,
                        email: findUserData.email,
                        profileImage: findUserData.profileImage
                    }
                    return res.status(401).json({ authentication: true, UserData: data })
                } else {
                    return res.status(201).json({ authentication: false })
                }
            } else {
                return res.status(201).json({ authentication: false })
            }
        }
    } catch (err) {
        console.log("This error from '/checklogin[authentication]' " + err)
        return res.status(501).json({ authentication: false })
    }
}

module.exports = {
    authentication
}
