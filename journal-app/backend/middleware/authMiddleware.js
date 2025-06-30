const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    const auth = req.headers.authorization

    if (auth && auth.startsWith('Bearer')) {
        try {
            token = auth.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            // Since this is middleware, the functionality doesn't begin nor end with this function
            // Hence, we're saying after we authorize, carry on with the next function, wherever protect is used
            // Protect is like a test, that if you pass, you can carry on with the original function
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized Bledge')
        }
    }
    
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

// ...allowedRoles just means passing multiple rows
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Checks if user exists, then if their role is included in the allowed roles list
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403)
            throw new Error('Access Denied: Not Premium Account')
        }
        next()
    }
}

module.exports = { protect, authorizeRoles }