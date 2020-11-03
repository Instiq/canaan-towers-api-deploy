const mongoose = require('mongoose');

const Power = mongoose.model('Power', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    carousel: [],
    slider: []
})

module.exports = Power;