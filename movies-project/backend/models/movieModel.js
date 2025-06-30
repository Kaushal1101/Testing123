// Create the database model for movies
// Consists of a User field now, to track which user entered which movie
// User field needs a reference to user model

const mongoose = require('mongoose')
const movieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Movie', movieSchema) 

