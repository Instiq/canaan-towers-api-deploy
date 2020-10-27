const mongoose = require('mongoose');

const Building = mongoose.model('Building', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: String,
        required: true,
    },
})

module.exports = Building;