const bcrypt = require('bcrypt');

//Password encryption algorithm
encriptPasword = async (req, res, next) => {
    try {
        const password = req.body.password
        if (!password) {
            return res.status(403).json({ empty: 'Empty field' })
        } else {
            hashedPassword = await bcrypt.hash(password, 13)
            req.HashedPassword = hashedPassword
            next()
        }
    } catch (err) {
        console.log({ EncriptPasswordError: err })
    }

}

module.exports = {
    encriptPasword,
}