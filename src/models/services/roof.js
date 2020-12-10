const mongoose = require('mongoose');

const RoofCarousel = mongoose.model('RoofCarousel', { 
    carousel: {
        type: String
    }
}) 

const RoofSlider = mongoose.model('RoofSlider', { 
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

const RoofCatalogue = mongoose.model('RoofCatalogue', { 
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
        required: true
    }
})


module.exports = { RoofSlider, RoofCarousel, RoofCatalogue };

