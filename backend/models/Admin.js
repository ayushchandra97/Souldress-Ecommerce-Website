const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String
    }, 
    password: {
        type: String
    }
})


module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema)