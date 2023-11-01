const { SIGNUP } = require("../Models/SignupModel")
const bcrypt = require('bcrypt')

//Signup handelr
handleUserSignup = async (req, res) => {
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
const handleUserLogin = async (req, res) => {
    try {
        data = req.UserData
        _id = data.success.uid
        verifydData = await SIGNUP.findOne({ _id })
        res.status(200).json({ SuccessfullyLogedin: verifydData })
    } catch (err) {
        res.status(501).json({ handleLoginError: err.message });
        console.error(err);
    }
};

module.exports = {
    handleUserSignup,
    handleUserLogin
}