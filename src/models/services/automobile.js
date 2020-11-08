const mongoose = require('mongoose');

const Automobile = mongoose.model('Automobile', { 
    description: {
        type: String,
        required: true,
        trim: true
    },
    carousel: [],
    slider: []
})



module.exports = Automobile;