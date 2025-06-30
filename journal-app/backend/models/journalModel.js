
const mongoose = require('mongoose')
const journalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add your entry title'],
        maxlength: [40, 'Title cannot exceed 40 characters'],
    },
    content: {
        type: String, 
        required: [true, 'Please add your journal content']
    }
}, {
    timestamps: true,
})

// Makes it such that two diff users can have same title, but one user can't have duplicate titles
journalSchema.index({ user: 1, title: 1 }, { unique: true })

module.exports = mongoose.model('Journal', journalSchema) 