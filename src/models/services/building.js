const mongoose = require('mongoose');


const BuildingCarousel = mongoose.model('BuildingCarousel', { 
    carousel: {
        type: String
    }
}) 

const BuildSlider = mongoose.model('BuildSlider', { 
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


module.exports = { BuildingCarousel, BuildSlider };

