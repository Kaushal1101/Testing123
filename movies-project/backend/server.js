// Server file that acts as main entry point to the program
// Ensure order of lins are maintained as it's very important

const express = require('express')

// Just adds colors to db visuals
const colors = require('colors')

// Loads environment variables from dotenv and configures them at the same time
// so we can start using them now
const dotenv = require('dotenv').config()

// Load error handler file from middleware
const {errorHandler} = require("./middleware/errorMiddleWare")

// Import db handler
// NOTE : {connectDB} when module.exports has {} arguments
// If module.exports = connectDB, then just const connectDB will do
const { connectDB } = require('./config/db')
const { connect } = require('./routes/movieRoutes')

// Sets up port as 5000 (from .env) or 8000 if not available
const port = process.env.PORT || 8000

// Connects to MongoDB database
connectDB()

// Instantiates express (not a class technically, but a function)
// Basically an instance of the express app, which is an object that 
// - handles HTTP requests
// - manages routes, middleware, errors, etc.
// - powers the backend server
const app = express()


// Example of express middleware to allow server to accept and handle requests
// Used for POST and PUT requests, or REST APIs sending JSON from Postman or frontend apps
app.use(express.json())

// Parses url encoded data in HTML form
// False implies using built-in query string library for basic key-value parsing
// True implies using qs library, supporting nested objects
app.use(express.urlencoded({ extended: false }))

// Mounts a router file to handle all routes starting with /api/movies
// Basically anything starting with /api/movies is re-routed to routes defined in routes/movieRoutes
app.use('/api/movies', require('./routes/movieRoutes'))

// Mounts router for users
app.use('/api/users', require('./routes/userRoutes'))

// Use errorhandler for the app
app.use(errorHandler)

// Starts the server and listens for any requests
app.listen(port, () => console.log(`server started on port ${port}`))

