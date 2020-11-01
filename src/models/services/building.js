const mongoose = require('mongoose');

const Building = mongoose.model('Building', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    carousel: [],
    slider: []
})

module.exports = Building;