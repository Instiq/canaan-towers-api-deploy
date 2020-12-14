const mongoose = require('mongoose');


const roadCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})


const RoadCarousel = mongoose.model('roadCarousel', roadCarouselSchema) 


const roadSliderSchema = new mongoose.Schema({
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


const RoadSlider = mongoose.model('roadSlider', roadSliderSchema)


module.exports = { RoadCarousel, RoadSlider };

