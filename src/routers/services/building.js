const express = require('express')
const { BuildSlider, BuildingCarousel }  = require('../../models/services/building')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/building/carousel', authAdmin, upload.single('image'), async (req, res) => {
    console.log(req.file)
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const buildingCarousel = new BuildingCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await buildingCarousel.save()
        res.status(201).send(buildingCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Add Project  you removed auth and made image unrequired
router.post('/building/slider', upload.single('image'), async (req, res) => {
    console.log(req.file)
    // if(!req.file) {
    //     res.status(400).send('Upload threee images')
    //     process.exit(1)
    // // }
    const buildingslider = new BuildSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    })

    try {
        await buildingslider.save()
        res.status(201).send(buildingslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/building/slider', async (req, res) => {
    try {
        const buildSlider = await BuildSlider.find({})

        res.send(buildSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/building/carousel', async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.find({})

        res.send(buildingCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/building/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const buildingCarousel = await BuildingCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!buildingCarousel) {
            return res.status(404).send()
        }
        await buildingCarousel.save()
        res.send(buildingCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/building/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, images: image }
    
    try {
        const buildSlider = await BuildSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!buildSlider) {
            return res.status(404).send()
        }
        await buildSlider.save()
        res.send(buildSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/building/carousel/:id', authAdmin, async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.findByIdAndDelete(req.params.id)

        if (!buildingCarousel) {
            return res.status(404).send()
        }
        buildingCarousel.remove()
        res.send(buildingCarousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/building/slider/:id', authAdmin, async (req, res) => {
    try {
        const buildSlider = await BuildSlider.findByIdAndDelete(req.params.id)

        if (!buildSlider) {
            return res.status(404).send()
        }
        buildSlider.remove()
        res.send(buildSlider)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
