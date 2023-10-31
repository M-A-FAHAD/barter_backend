const mongose = require('mongoose')

const userSignup = mongose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
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
    }
}, {
    timestamps: true
})
const SIGNUP = mongose.model('Users', userSignup)
module.exports = {
    SIGNUP
}
