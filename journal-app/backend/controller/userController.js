const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error("Please enter information")
    } else {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !('role' in req.body)) {
            res.status(400)
            throw new Error('Please enter all details')
        }


        // Technically not needed as frontend should ideally not make such a request
        // Just in case, and for postman testing
        // Checking through db will lead to timeout, too time consuming
        if (role !== 'premium' && role !== 'basic' && role !== '') {
            res.status(400)
            throw new Error('Access level does not exist')
        }

        // Rule of thumb, use await when return value is a promise
        // Common promises are database queries, network calls, read files, and encryptio
        //const userExists = await User.findOne({email}).populate('user', 'name role')
        const userExists = await User.findOne({email})

        if (userExists) {
            res.status(400)
            throw new Error("User already exists")
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
            role: role ? role : 'basic'
        })


        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })
        } else {
            res.status(400)
            throw new Error("Invalid User")
        }
    }
})

// @desc    Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please enter login info')
    }

    const {email, password} = req.body

    // Curly braces because findOne expects key-value pair params
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        console.log(user)
        res.status(400)
        throw new Error('Invalid user credentials')
    }

})

// @desc    Get User data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // Note that getMe is private
    // Private is not like Java, it refers to user authentication, not function usability
    // We can see it's private as it's called with protectMe authorization
    const {_id, name, email, token} = req.user

    res.status(200).json({
        // One time renaming of _id to id
        // Basically sends an id field with _id, that's all
        // _id is the real id stored directly in mongoose, id is the syntactic sugar version
        id: _id, 
        name,
        email,
        role,
        token
    })
})

// Generate the token
// Think of it as a permission slip given to user, vouched for by the server
// Token can be used to access other parts of the program, without authentication
const generateToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}