const { SIGNUP } = require("../Models/SignupModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');


//environment variable configuration
dotenv.config()
//Signup handelr
const handleUserSignup = async (req, res) => {
    const { name, email, password, profileImage } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(403).json({ empty: 'Empty field' })
        }
        const findUser = await SIGNUP.findOne({ email: email });
        if (!findUser) {
            const hashedPassword = await bcrypt.hash(password, 13)
            await SIGNUP.create({
                name: name,
                email: email,
                password: hashedPassword,
                profileImage: profileImage
            });
            // You can return a success message or any other appropriate response here.
            return res.status(200).json({ Success: 'User signed up successfully' });
        } else {
            return res.status(505).json({ already_exists: true })
        }

    } catch (error) {
        console.log("An error from handleSignup: " + error)
        return res.status(400).json({ error: 'Inter Server error' });

    }
}

//Login and JWT Authentication
const jwt_key = process.env.jwt_key
const handleUserLogin = async (req, res) => {
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

                    const jwt_token = jwt.sign(jwtData, jwt_key, { expiresIn: '2 days' });

                    // Set JWT token in a cookie [problem:cookie not set in the broweser]
                    res.cookie('token', jwt_token, {
                        maxAge: 2 * 24 * 60 * 60 * 1000,  // 2 days in milliseconds
                        httpOnly: true,
                        secure: true
                    });
                    // Set "Authorization" header
                    // res.setHeader('Authorization', 'Bearer ' + jwt_token);

                    //temporary solution 

                    // Attach user data to the request
                    res.status(200).json({ success: 'user loged in successfully', token: jwt_token })
                } else {
                    return res.status(401).json({ failed: 'login failed' });
                }
            }
        }
    } catch (err) {
        console.error({ InsertJWTError: 'Error in handleUserLogin', err });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Update profile
const updateProfile = async (req, res) => {
    const { id, name, email, profileImage, password, newpassword } = req.body;
    if (!id || !name || !email || !profileImage || !password) {
        return res.status(404).json({ failed: 'Profile update failed one' })
    }
    const User = await SIGNUP.findOne({ _id: id })
    if (!User) {
        return res.status(404).json({ failed: 'Profile update failed two' })
    }
    const passwordValidate = await bcrypt.compare(password, User.password);
    if (passwordValidate === true) {
        if (newpassword) {
            User.name = name;
            User.email = email;
            User.profileImage = profileImage
            const hashedPassword = await bcrypt.hash(newpassword, 13)
            User.password = hashedPassword;
            await User.save()
            return res.status(200).json({ success: 'Profile updated successfully' });
        } else {
            User.name = name;
            User.email = email;
            User.profileImage = profileImage
            await User.save()
            return res.status(200).json({ success: 'Profile updated successfully' });
        }
        // Respond with a success message
    } else {
        return res.status(404).json({ failed: 'Profile update failed three' })
    }
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
    updateProfile
}