const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const { addCarousel, addSlider, viewSlider, viewCarousel, updateCarousel, updateSlider, deleteCarousel, deleteSlider } = require('../../controllers/services/roadworks')
const router = new express.Router() 


// Add Carousel
router.post('/road/carousel', authAdmin, upload.single('image'), addCarousel)

// Add Project
router.post('/road/slider', authAdmin, upload.single('image'), addSlider)

// View projects
router.get('/road/slider', viewSlider)

// view carousels
router.get('/road/carousel', viewCarousel)


// Updates Carousel
router.patch('/road/carousel/:id', authAdmin, upload.single('image'), updateCarousel)


// Update Slider
router.patch('/road/slider/:id', authAdmin, upload.single('image'), updateSlider)

// Delete Carousel
router.delete('/road/carousel/:id', authAdmin, deleteCarousel)

router.delete('/road/slider/:id', authAdmin, deleteSlider)

module.exports = router
