const mongoose = require('mongoose');

const FurnishCarousel = mongoose.model('FurnishCarousel', { 
    carousel: {
        type: String
    }
}) 

const FurnishSlider = mongoose.model('FurnishSlider', { 
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

const FurnishCatalogue = mongoose.model('FurnishCatalogue', { 
    image: { 
        type: String,
        required: true
    },
    item: { 
        type: String,
        required: true
    },
    price: { 
        type: String,
        required: true
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


module.exports = { FurnishSlider, FurnishCarousel, FurnishCatalogue };

