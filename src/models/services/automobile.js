const mongoose = require('mongoose');

const automobileCarouselSchema = new mongoose.Schema({
    carousel: {
        type: String,
        required: true
    }
},  {
    timestamps: true
})

const AutomobileCarousel = mongoose.model('AutomobileCarousel', automobileCarouselSchema) 


const automobileSliderSchema = new mongoose.Schema({
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


const AutomobileSlider = mongoose.model('AutomobileSlider', automobileSliderSchema)

const automobileCatalogueSchema = new mongoose.Schema({
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

const AutomobileCatalogue = mongoose.model('AutomobileCatalogue', automobileCatalogueSchema)


module.exports = { AutomobileSlider, AutomobileCarousel, AutomobileCatalogue };

