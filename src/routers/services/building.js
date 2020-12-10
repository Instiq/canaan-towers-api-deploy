const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const { addCarousel, addSlider, viewCarousel, viewSlider, updateCarousel, updateSlider, deleteSlider, deleteCarousel } = require('../../controllers/services/building')
const router = new express.Router() 


// Add Carousel
router.post('/building/carousel', authAdmin, upload.single('image'), addCarousel)

// Add Project  you removed auth and made image unrequired
router.post('/building/slider', authAdmin, upload.single('image'), addSlider)

// View projects
router.get('/building/slider', viewSlider)

// view carousels
router.get('/building/carousel', viewCarousel)


// Updates Carousel
router.patch('/building/carousel/:id', authAdmin, upload.single('image'), updateCarousel)


// Update Slider
router.patch('/building/slider/:id', authAdmin, upload.single('image'), updateSlider)

// Delete Carousel
router.delete('/building/carousel/:id', authAdmin, deleteCarousel)

router.delete('/building/slider/:id', authAdmin, deleteSlider)

module.exports = router
