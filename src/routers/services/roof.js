const express = require('express')
const { RoofSlider, RoofCarousel, RoofCatalogue }  = require('../../models/services/roof')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/roof/carousel', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const roofCarousel = new RoofCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await roofCarousel.save()
        res.status(201).send(roofCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// Add Catalogue
router.post('/roof/catalogue', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload An image')
        process.exit(1)
    }

    req.body.price = `₦${req.body.price}`
    const roofcatalogue = new RoofCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await roofcatalogue.save()
        res.status(201).send(roofcatalogue)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// Add Project
router.post('/roof/slider', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }
    const roofslider = new RoofSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await roofslider.save()
        res.status(201).send(roofslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/roof/slider', async (req, res) => {
    try {
        const roofSlider = await RoofSlider.find({})

        res.send(roofSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// view catalogue
router.get('/roof/catalogue', async (req, res) => {
    try {
        const roofcatalogue = await RoofCatalogue.find({})

        res.send(roofcatalogue)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/roof/carousel', async (req, res) => {
    try {
        const roofCarousel = await RoofCarousel.find({})

        res.send(roofCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/roof/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const roofCarousel = await RoofCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofCarousel) {
            return res.status(404).send()
        }
        await roofCarousel.save()
        res.send(roofCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/roof/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const roofSlider = await RoofSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofSlider) {
            return res.status(404).send()
        }
        await roofSlider.save()
        res.send(roofSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})
// Update Catalogue
router.patch('/roof/catalogue/:id', authAdmin, upload.single('image'), async (req, res) => {
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
        const roofCatalogue = await RoofCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofCatalogue) {
            return res.status(404).send()
        }
        await roofCatalogue.save()
        res.send(roofCatalogue)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/roof/carousel/:id', authAdmin, async (req, res) => {
    try {
        const roofCarousel = await RoofCarousel.findByIdAndDelete(req.params.id)

        if (!roofCarousel) {
            return res.status(404).send()
        }
        roofCarousel.remove()
        res.send(roofCarousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/roof/slider/:id', authAdmin, async (req, res) => {
    try {
        const roofSlider = await RoofSlider.findByIdAndDelete(req.params.id)

        if (!roofSlider) {
            return res.status(404).send()
        }
        roofSlider.remove()
        res.send(roofSlider)
    } catch (e) {
        res.status(500).send()
    }
})
router.delete('/roof/catalogue/:id', authAdmin, async (req, res) => {
    try {
        const roofCatalogue = await RoofCatalogue.findByIdAndDelete(req.params.id)

        if (!roofCatalogue) {
            return res.status(404).send()
        }
        roofCatalogue.remove()
        res.send(roofCatalogue)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
