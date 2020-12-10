const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const {  addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCatalogue, updateCarousel, updateSlider, deleteCarousel, deleteSlider, deleteCatalogue } = require('../../controllers/services/power')
const router = new express.Router() 


// Add Carousel
router.post('/power/carousel', authAdmin, upload.single('image'), addCarousel)


// Add Catalogue
router.post('/power/catalogue', authAdmin, upload.single('image'), addCatalogue)

// Add Project
router.post('/power/slider', authAdmin, upload.single('image'), addSlider)

// View projects
router.get('/power/slider', viewSlider)


// view catalogue
router.get('/power/catalogue', viewCatalogue)

// view carousels
router.get('/power/carousel', viewCarousel)


// Updates Carousel
router.patch('/power/carousel/:id', authAdmin, upload.single('image'), updateCarousel)


// Update Slider
router.patch('/power/slider/:id', authAdmin, upload.single('image'), updateSlider)

// Update Catalogue
router.patch('/power/catalogue/:id', authAdmin, upload.single('image'), updateCatalogue)

// Delete Carousel
router.delete('/power/carousel/:id', authAdmin, deleteCarousel)


router.delete('/power/slider/:id', authAdmin, deleteSlider)


router.delete('/power/catalogue/:id', authAdmin, deleteCatalogue)

module.exports = router
