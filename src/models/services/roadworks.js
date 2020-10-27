const mongoose = require('mongoose');

const Roadworks = mongoose.model('Roadwork', {
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Images: {
        type: String,
        required: true,
    },
})

module.exports = Roadworks;