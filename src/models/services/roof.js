const mongoose = require('mongoose');

const Roof = mongoose.model('Roof', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    carousel: [],
    slider: []
})

module.exports = Roof;