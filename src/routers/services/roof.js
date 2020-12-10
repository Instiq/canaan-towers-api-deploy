const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue  } = require('../../controllers/services/roof')
const router = new express.Router() 


// Add Carousel
router.post('/roof/carousel', authAdmin, upload.single('image'), addCarousel)


// Add Catalogue
router.post('/roof/catalogue', authAdmin, upload.single('image'), addCatalogue)

// Add Project
router.post('/roof/slider', authAdmin, upload.single('image'), addSlider)

// View projects
router.get('/roof/slider', viewSlider)


// view catalogue 
router.get('/roof/catalogue', viewCatalogue)

// view carousels
router.get('/roof/carousel', viewCarousel)

 
// Updates Carousel
router.patch('/roof/carousel/:id', authAdmin, upload.single('image'), updateCarousel)


// Update Slider
router.patch('/roof/slider/:id', authAdmin, upload.single('image'), updateSlider)
// Update Catalogue
router.patch('/roof/catalogue/:id', authAdmin, upload.single('image'), updateCatalogue)

// Delete Carousel
router.delete('/roof/carousel/:id', authAdmin, deleteCarousel)

router.delete('/roof/slider/:id', authAdmin, deleteSlider)


router.delete('/roof/catalogue/:id', authAdmin, deleteCatalogue)

module.exports = router
