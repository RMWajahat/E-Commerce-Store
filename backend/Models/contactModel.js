const mongoose = require('mongoose');
const validator = require('validator');


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, "Name must be at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must be at least 10 characters"],
        maxLength: [300, "Message cannot exceed 300 characters"],
    }
})


module.exports = mongoose.model('Contact', contactSchema);