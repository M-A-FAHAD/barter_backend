const express = require('express')
const { handleUserSignup, handleUserLogin, updateProfile } = require('../Controlers/user')
const { uploadPost } = require('../Controlers/uploadPost')
const { authentication } = require('../Controlers/chackLogin')



const userRoutes = express.Router()



userRoutes.post('/signup', handleUserSignup)
userRoutes.put('/updateprofile', updateProfile)
userRoutes.post('/login', handleUserLogin)
userRoutes.post('/uploadpost', uploadPost)
userRoutes.get('/authentication', authentication)


module.exports = userRoutes