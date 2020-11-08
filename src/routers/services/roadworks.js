const express = require('express')
const { RoadCarousel, RoadSlider}  = require('../../models/services/roadworks')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Add Carousel
router.post('/road/carousel', authAdmin, upload.single('image'), async (req, res) => {
    console.log(req.file)
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }

    const roadCarousel = new RoadCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await roadCarousel.save()
        res.status(201).send(roadCarousel)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// Add Project
router.post('/road/slider', authAdmin, upload.single('image'), async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload threee images')
        process.exit(1)
    }
    const roadslider = new RoadSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    })

    try {
        await roadslider.save()
        res.status(201).send(roadslider)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View projects
router.get('/road/slider', async (req, res) => {
    try {
        const roadSlider = await RoadSlider.find({})

        res.send(roadSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// view carousels
router.get('/road/carousel', async (req, res) => {
    try {
        const roadCarousel = await RoadCarousel.find({})

        res.send(roadCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Updates Carousel
router.patch('/road/carousel/:id', authAdmin, upload.single('image'), async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const roadCarousel = await RoadCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roadCarousel) {
            return res.status(404).send()
        }
        await roadCarousel.save()
        res.send(roadCarousel)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update Slider
router.patch('/road/slider/:id', authAdmin, upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const roadSlider = await RoadSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roadSlider) {
            return res.status(404).send()
        }
        await roadSlider.save()
        res.send(roadSlider)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Carousel
router.delete('/road/carousel/:id', authAdmin, async (req, res) => {
    try {
        const roadCarousel = await RoadCarousel.findByIdAndDelete(req.params.id)

        if (!roadCarousel) {
            return res.status(404).send()
        }
        roadCarousel.remove()
        res.send(roadCarousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/road/slider/:id', authAdmin, async (req, res) => {
    try {
        const roadSlider = await RoadSlider.findByIdAndDelete(req.params.id)

        if (!roadSlider) {
            return res.status(404).send()
        }
        roadSlider.remove()
        res.send(roadSlider)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
