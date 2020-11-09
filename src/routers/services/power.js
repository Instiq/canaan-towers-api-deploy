const express = require('express')
const { PowerSlider, PowerCarousel, PowerCatalogue }  = require('../../models/services/power')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/power/carousel', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const powerCarousel = new PowerCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await powerCarousel.save()
        res.status(201).send(powerCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// Add Catalogue
router.post('/power/catalogue', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload An image')
        process.exit(1)
    }

    req.body.price = `₦${req.body.price}`
    const powercatalogue = new PowerCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await powercatalogue.save()
        res.status(201).send(powercatalogue)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// Add Project
router.post('/power/slider', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }
    const powerslider = new PowerSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await powerslider.save()
        res.status(201).send(powerslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/power/slider', async (req, res) => {
    try {
        const powerSlider = await PowerSlider.find({})

        res.send(powerSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// view catalogue
router.get('/power/catalogue', async (req, res) => {
    try {
        const powercatalogue = await PowerCatalogue.find({})

        res.send(powercatalogue)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/power/carousel', async (req, res) => {
    try {
        const powerCarousel = await PowerCarousel.find({})

        res.send(powerCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/power/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const powerCarousel = await PowerCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerCarousel) {
            return res.status(404).send()
        }
        await powerCarousel.save()
        res.send(powerCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/power/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const powerSlider = await PowerSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerSlider) {
            return res.status(404).send()
        }
        await powerSlider.save()
        res.send(powerSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})
// Update Catalogue
router.patch('/power/catalogue/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'description', 'item', 'specification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log('g', isValidOperation, req.body)
    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}`
    req.body.price = `₦${req.body.price}`

    req.body = { ...req.body, image }
    
    try {
        const powerCatalogue = await PowerCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerCatalogue) {
            return res.status(404).send()
        }
        await powerCatalogue.save()
        res.send(powerCatalogue)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/power/carousel/:id', authAdmin, async (req, res) => {
    try {
        const powerCarousel = await PowerCarousel.findByIdAndDelete(req.params.id)

        if (!powerCarousel) {
            return res.status(404).send()
        }
        powerCarousel.remove()
        res.send(powerCarousel)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/power/slider/:id', authAdmin, async (req, res) => {
    try {
        const powerSlider = await PowerSlider.findByIdAndDelete(req.params.id)

        if (!powerSlider) {
            return res.status(404).send()
        }
        powerSlider.remove()
        res.send(powerSlider)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/power/catalogue/:id', authAdmin, async (req, res) => {
    try {
        const powerCatalogue = await PowerCatalogue.findByIdAndDelete(req.params.id)

        if (!powerCatalogue) {
            return res.status(404).send()
        }
        powerCatalogue.remove()
        res.send(powerCatalogue)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
