const mongoose = require('mongoose');
const validator = require('validator');

const Roofing = mongoose.model('Roof', {
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Images: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
})

module.exports = Roofing;