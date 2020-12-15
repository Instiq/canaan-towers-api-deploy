const mongoose = require('mongoose');


const roofCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})

const RoofCarousel = mongoose.model('RoofCarousel', roofCarouselSchema) 


const roofSliderSchema = new mongoose.Schema({
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

const RoofSlider = mongoose.model('RoofSlider', roofSliderSchema)


const roofCatalogueSchema = new mongoose.Schema({
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
        type: String
    }
},  {
    timestamps: true
})

const RoofCatalogue = mongoose.model('RoofCatalogue', roofCatalogueSchema)


module.exports = { RoofSlider, RoofCarousel, RoofCatalogue };

