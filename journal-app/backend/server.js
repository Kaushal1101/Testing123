const express = require('express')
const colours = require('colours')
const dotenv = require('dotenv').config()

const {errorHandler} = require("./middleware/errorMiddleWare")

const { connectDB } = require('./config/db')
const { connect } = require('./routes/journalRoutes')

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/journals', require('./routes/journalRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))