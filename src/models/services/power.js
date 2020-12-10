const mongoose = require('mongoose');

const PowerCarousel = mongoose.model('PowerCarousel', { 
    carousel: {
        type: String
    }
}) 

const PowerSlider = mongoose.model('PowerSlider', { 
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

const PowerCatalogue = mongoose.model('PowerCatalogue', { 
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


module.exports = { PowerSlider, PowerCarousel, PowerCatalogue };

