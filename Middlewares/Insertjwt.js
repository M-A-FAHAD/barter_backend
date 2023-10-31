const { SIGNUP } = require("../Models/SignupModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//env configuration
const dotenv = require('dotenv')
dotenv.config()
// This is our secret key for JWT authentication
const jwt_key = process.env.jwt_key
const insertJWT = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ empty: 'Empty field' });
        } else {
            const UserData = await SIGNUP.findOne({ email });

            if (!UserData) {
                return res.status(403).json({ NotFound: 'User not found' });
            } else {
                const hashedPassword = UserData.password;
                const passwordValidate = await bcrypt.compare(password, hashedPassword);

                if (passwordValidate === true) {
                    const jwtData = {
                        uid: UserData._id,
                        email: UserData.email
                    };

                    const generatedJWT = jwt.sign(jwtData, jwt_key, { expiresIn: '2 days' });

                    // Set JWT token in a cookie
                    res.cookie('Jwt_token', generatedJWT, { maxAge: 2 * 24 * 60 * 60 * 1000 }); // 2 days in milliseconds

                    // Set "Authorization" header
                    res.setHeader('Authorization', 'Bearer ' + generatedJWT);

                    // Attach user data to the request
                    req.UserData = { success: jwtData };
                    next();
                } else {
                    return res.status(401).json({ NotValidPassword: 'Password not valid' });
                }
            }
        }
    } catch (err) {
        console.error({ InsertJWTError: 'Error in insertJWT middleware', error: err });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checklogin = async (req, res, next) => {
    // We are accepting token from headers
    const authorization = req.headers.authorization;

    try {
        if (!authorization) {
            // res.status(401).json({ NotLogin: 'User not logged in one ' });
            next()
        } else {
            const token = authorization.split(' ')[1]; // Split on space to get the token
            const decoded = jwt.verify(token, jwt_key);
            if (decoded) {
                const _id = decoded.uid;

                const UserData = await SIGNUP.findOne({ _id });

                if (UserData) {
                    res.UserData = UserData;
                    return res.status(200).json({ success: 'User already logdin' })
                } else {
                    // res.status(401).json({ NotLogin: 'User not logged in two' });
                    next()
                }
            } else {
                // res.status(401).json({ NotLogin: 'User not logged in three ' });
                next()
            }
        }
    } catch (err) {
        console.error({ checkLoginError: 'Error in checkLogin middleware', error: err });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    insertJWT,
    checklogin
};
