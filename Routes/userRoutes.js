const express = require('express')
const { handleUserSignup, handleUserLogin } = require('../Controlers/user')
const { insertJWT } = require('../Middlewares/Insertjwt')

const userRoutes = express.Router()



userRoutes.post('/signup', handleUserSignup)
userRoutes.post('/login', insertJWT, handleUserLogin)


module.exports = userRoutes