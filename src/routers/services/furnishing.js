const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const { addCarousel, addCatalogue, addSlider, viewSlider, viewCarousel, viewCatalogue, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue } = require('../../controllers/services/furnishing')
const router = new express.Router() 
 

// Add Carousel
router.post('/furnish/carousel', authAdmin, upload.single('image'), addCarousel)

// Add Catalogue
router.post('/furnish/catalogue', authAdmin, upload.single('image'), addCatalogue)
// Add Project
router.post('/furnish/slider', authAdmin, upload.single('image'), addSlider)

// View projects 
router.get('/furnish/slider', viewSlider)

// view catalogue
router.get('/furnish/catalogue', viewCatalogue)

// view carousels
router.get('/furnish/carousel', viewCarousel)


// Updates Carousel
router.patch('/furnish/carousel/:id', authAdmin, upload.single('image'), updateCarousel)

// Update Slider
router.patch('/furnish/slider/:id', authAdmin, upload.single('image'), updateSlider)
// Update Catalogue
router.patch('/furnish/catalogue/:id', authAdmin, upload.single('image'), updateCatalogue)

// Delete Carousel
router.delete('/furnish/carousel/:id', authAdmin, deleteCarousel)

router.delete('/furnish/slider/:id', authAdmin, deleteSlider)

router.delete('/furnish/catalogue/:id', authAdmin, deleteCatalogue)

module.exports = router
