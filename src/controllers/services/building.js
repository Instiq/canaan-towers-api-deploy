const { BuildSlider, BuildingCarousel }  = require('../../models/services/building')


const addCarousel = async (req, res) => {
    console.log('image', req.file)
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
        res.status(400).send(error.message)
    }
}


const addSlider = async (req, res) => {
    console.log('ede', req.file)
    if(!req.file) {
        res.status(400).send('Upload an image')
        process.exit(1)
    }
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
        res.status(400).send(error.message)
    }
}


const viewSlider = async (req, res) => {
    try {
        const buildSlider = await BuildSlider.find({})

        res.send(buildSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}
const viewCarousel = async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.find({})

        res.send(buildingCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const updateCarousel = async (req, res) => {
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
}

const updateSlider = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation || !req.file) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image: image }
    
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
}

const deleteSlider = async (req, res) => {
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
}

const deleteCarousel = async (req, res) => {
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
}

module.exports = { addCarousel, addSlider, viewCarousel, viewSlider, updateCarousel, updateSlider, deleteSlider, deleteCarousel }