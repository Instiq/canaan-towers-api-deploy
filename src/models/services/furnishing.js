const mongoose = require('mongoose');


const furnishCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})

const FurnishCarousel = mongoose.model('FurnishCarousel', furnishCarouselSchema) 


const furnishSliderSchema = new mongoose.Schema({
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

const FurnishSlider = mongoose.model('FurnishSlider', furnishSliderSchema)


const furnishCatalogueSchema = new mongoose.Schema({
    image: { 
        type: String
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

const FurnishCatalogue = mongoose.model('FurnishCatalogue', furnishCatalogueSchema)


module.exports = { FurnishSlider, FurnishCarousel, FurnishCatalogue };

