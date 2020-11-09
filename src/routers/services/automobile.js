const express = require('express')
const { AutomobileSlider, AutomobileCarousel, AutomobileCatalogue }  = require('../../models/services/automobile')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/automobile/carousel', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const automobileCarousel = new AutomobileCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await automobileCarousel.save()
        res.status(201).send(automobileCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// Add Catalogue
router.post('/automobile/catalogue', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload An image')
        process.exit(1)
    }

    req.body.price = `₦${req.body.price}`
    const automobilecatalogue = new AutomobileCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await automobilecatalogue.save()
        res.status(201).send(automobilecatalogue)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Add Project
router.post('/automobile/slider', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }
    const automobileslider = new AutomobileSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await automobileslider.save()
        res.status(201).send(automobileslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/automobile/slider', async (req, res) => {
    try {
        const automobileSlider = await AutomobileSlider.find({})

        res.send(automobileSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// view catalogue
router.get('/automobile/catalogue', async (req, res) => {
    try {
        const automobilecatalogue = await AutomobileCatalogue.find({})

        res.send(automobilecatalogue)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/automobile/carousel', async (req, res) => {
    try {
        const automobileCarousel = await AutomobileCarousel.find({})

        res.send(automobileCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/automobile/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const automobileCarousel = await AutomobileCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileCarousel) {
            return res.status(404).send()
        }
        await automobileCarousel.save()
        res.send(automobileCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/automobile/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const automobileSlider = await AutomobileSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileSlider) {
            return res.status(404).send()
        }
        await automobileSlider.save()
        res.send(automobileSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})
// Update Catalogue
router.patch('/automobile/catalogue/:id', authAdmin, upload.single('image'), async (req, res) => {
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
        const automobileCatalogue = await AutomobileCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileCatalogue) {
            return res.status(404).send()
        }
        await automobileCatalogue.save()
        res.send(automobileCatalogue)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/automobile/carousel/:id', authAdmin, async (req, res) => {
    try {
        const automobileCarousel = await AutomobileCarousel.findByIdAndDelete(req.params.id)

        if (!automobileCarousel) {
            return res.status(404).send()
        }
        automobileCarousel.remove()
        res.send(automobileCarousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/automobile/slider/:id', authAdmin, async (req, res) => {
    try {
        const automobileSlider = await AutomobileSlider.findByIdAndDelete(req.params.id)

        if (!automobileSlider) {
            return res.status(404).send()
        }
        automobileSlider.remove()
        res.send(automobileSlider)
    } catch (e) {
        res.status(500).send()
    }
})
router.delete('/automobile/catalogue/:id', authAdmin, async (req, res) => {
    try {
        const automobileCatalogue = await AutomobileCatalogue.findByIdAndDelete(req.params.id)

        if (!automobileCatalogue) {
            return res.status(404).send()
        }
        automobileCatalogue.remove()
        res.send(automobileCatalogue)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
