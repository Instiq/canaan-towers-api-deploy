const mongoose = require('mongoose');


const powerCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})

const PowerCarousel = mongoose.model('PowerCarousel', powerCarouselSchema) 


const powerSliderSchema = new mongoose.Schema({
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

const PowerSlider = mongoose.model('PowerSlider', powerSliderSchema)


const powerCatalogueSchema = new mongoose.Schema({
    image: { 
        type: String,
        required: true
    },
    item: { 
        type: String,
        required: true
    },
    price: { 
        type: String
    },
    description: { 
        type: String,
        required: true
    },
    specification: { 
        type: String,
    }
},  {
    timestamps: true
})

const PowerCatalogue = mongoose.model('PowerCatalogue', powerCatalogueSchema)


module.exports = { PowerSlider, PowerCarousel, PowerCatalogue };

