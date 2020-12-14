const mongoose = require('mongoose');


const buildingCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})

const BuildingCarousel = mongoose.model('BuildingCarousel', buildingCarouselSchema) 


const buildingSliderSchema = new mongoose.Schema({
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
},  {
    timestamps: true
})

const BuildSlider = mongoose.model('BuildSlider', buildingSliderSchema) 


module.exports = { BuildingCarousel, BuildSlider };

