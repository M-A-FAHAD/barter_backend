const express = require('express')

const adminRoutes = express.Router()


adminRoutes.get('/', (req, res) => {
    res.json({ success: 'This is admin routes' })
})


module.exports = adminRoutes