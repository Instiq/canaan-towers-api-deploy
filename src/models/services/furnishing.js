const mongoose = require('mongoose');

const Furnishing = mongoose.model('Furnishing', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    carousel: [],
    slider: []
})

module.exports = Furnishing;