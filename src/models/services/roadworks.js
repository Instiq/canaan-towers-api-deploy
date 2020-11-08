const mongoose = require('mongoose');

const RoadCarousel = mongoose.model('roadCarousel', { 
    carousel: {
        type: String
    }
}) 

const RoadSlider = mongoose.model('roadSlider', { 
    image: { 
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    }
})


module.exports = { RoadCarousel, RoadSlider };

