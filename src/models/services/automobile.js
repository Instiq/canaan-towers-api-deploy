const mongoose = require('mongoose');

const AutomobileCarousel = mongoose.model('AutomobileCarousel', { 
    carousel: {
        type: String
    }
}) 

const AutomobileSlider = mongoose.model('AutomobileSlider', { 
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

const AutomobileCatalogue = mongoose.model('AutomobileCatalogue', { 
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


module.exports = { AutomobileSlider, AutomobileCarousel, AutomobileCatalogue };

