const express = require('express')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const { addCarousel, addCatalogue, addSlider, viewCarousel, viewSlider, viewCatalogue, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue } = require('../../controllers/services/automobile')
const router = new express.Router() 


// Add Carousel
router.post('/automobile/carousel', authAdmin, upload.single('image'), addCarousel)


// Add Catalogue
router.post('/automobile/catalogue', authAdmin, upload.single('image'), addCatalogue)

// Add Project
router.post('/automobile/slider', authAdmin, upload.single('image'), addSlider)

// View projects
router.get('/automobile/slider', viewSlider)


// view catalogue
router.get('/automobile/catalogue', viewCatalogue)

// view carousels
router.get('/automobile/carousel', viewCarousel)


// Updates Carousel
router.patch('/automobile/carousel/:id', authAdmin, upload.single('image'), updateCarousel)


// Update Slider
router.patch('/automobile/slider/:id', authAdmin, upload.single('image'), updateSlider)
// Update Catalogue
router.patch('/automobile/catalogue/:id', authAdmin, upload.single('image'), updateCatalogue)

// Delete Carousel
router.delete('/automobile/carousel/:id', authAdmin, deleteCarousel)

router.delete('/automobile/slider/:id', authAdmin, deleteSlider)

router.delete('/automobile/catalogue/:id', authAdmin, deleteCatalogue)

module.exports = router
