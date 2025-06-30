const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controller/userController')

// Import protect function to authorize if user has token
const {protect} = require('../middleware/authMiddleware')

// Functionalities for user
router.post('/', registerUser)

// /login and /me don't do anything automatically
// They are just conventions for authentications
// Their functionalities must be defined properly later
router.post('/login', loginUser)

// Calls protect to authenticate JWT token
router.get('/me', protect, getMe)


module.exports = router