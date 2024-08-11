const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = cartSchema