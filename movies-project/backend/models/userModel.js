// User model to keep track of all users of app
// Can be linked to movies

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    }, 
    email: {
        type: String,
        required: [true, 'Please enter email'],
        // Emial id must be unique
        unique: true
    }, password: {
        type: String,
        required: [true, 'Please enter password']
    },
}, 
{
    timestamps: true
})

// Remember it's exportS not export, editor doesn't catch that error
module.exports = mongoose.model('User', userSchema)

