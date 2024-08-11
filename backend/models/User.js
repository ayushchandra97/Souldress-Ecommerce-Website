const mongoose = require('mongoose')
const cartSchema = require('./cartSchema')
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cart: [cartSchema],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)

