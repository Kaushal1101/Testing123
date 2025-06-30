const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    // Authentication tokens are stored in headers, and so we need to retrieve from there
    // Can put tokens in headers in POSTMAN to send requests as well
    const auth = req.headers.authorization

    if (auth && auth.startsWith('Bearer')) {
        try {
            // Splits the string, "Bearer Token" to get the second word, which is token
            token = auth.split(' ')[1]

            // Verify token with our secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Find user, minus password details, since we don't need it and don't want to retrieve it
            req.user = await User.findById(decoded.id).select('-password')

            // Since this is middleware, the functionality doesn't begin nor end with this function
            // Hence, we're saying after we authorize, carry on with the next function, wherever protect is used
            // Protect is like a test, that if you pass, you can carry on with the original function
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = { protect }