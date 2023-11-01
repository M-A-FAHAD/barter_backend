const mongose = require('mongoose')

const userSignup = mongose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String
    }
}, {
    timestamps: true
})
const SIGNUP = mongose.model('Users', userSignup)
module.exports = {
    SIGNUP
}
