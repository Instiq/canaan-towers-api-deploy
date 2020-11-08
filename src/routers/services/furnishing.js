const express = require('express')
const { FurnishSlider, FurnishCarousel, FurnishCatalogue }  = require('../../models/services/furnishing')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/furnish/carousel', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const furnishCarousel = new FurnishCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await furnishCarousel.save()
        res.status(201).send(furnishCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// Add Catalogue
router.post('/furnish/catalogue', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }

    req.body.price = `N${req.body.price}`
    const furnishcatalogue = new FurnishCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await furnishcatalogue.save()
        res.status(201).send(furnishcatalogue)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// Add Project
router.post('/furnish/slider', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }
    const furnishslider = new FurnishSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await furnishslider.save()
        res.status(201).send(furnishslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/furnish/slider', async (req, res) => {
    try {
        const furnishSlider = await FurnishSlider.find({})

        res.send(furnishSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// view catalogue
router.get('/furnish/catalogue', async (req, res) => {
    try {
        const furnishcatalogue = await FurnishCatalogue.find({})

        res.send(furnishcatalogue)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/furnish/carousel', async (req, res) => {
    try {
        const furnishCarousel = await FurnishCarousel.find({})

        res.send(furnishCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/furnish/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const furnishCarousel = await FurnishCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishCarousel) {
            return res.status(404).send()
        }
        await furnishCarousel.save()
        res.send(furnishCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/furnish/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const furnishSlider = await FurnishSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishSlider) {
            return res.status(404).send()
        }
        await furnishSlider.save()
        res.send(furnishSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})
// Update Catalogue
router.patch('/furnish/catalogue/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'description', 'name', '']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const furnishSlider = await FurnishSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishSlider) {
            return res.status(404).send()
        }
        await furnishSlider.save()
        res.send(furnishSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/furnish/carousel/:id', authAdmin, async (req, res) => {
    try {
        const furnishCarousel = await FurnishCarousel.findByIdAndDelete(req.params.id)

        if (!furnishCarousel) {
            return res.status(404).send()
        }
        furnishCarousel.remove()
        res.send(furnishCarousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/furnish/slider/:id', authAdmin, async (req, res) => {
    try {
        const furnishSlider = await FurnishSlider.findByIdAndDelete(req.params.id)

        if (!furnishSlider) {
            return res.status(404).send()
        }
        furnishSlider.remove()
        res.send(furnishSlider)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
