const { FurnishSlider, FurnishCarousel, FurnishCatalogue }  = require('../../models/services/furnishing')


const addCarousel = async (req, res) => {
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
}

const addCatalogue = async (req, res) => {
    if(!req.file) {
        res.status(400).send('Upload an image')
        process.exit(1)
    }

    req.body.price = `₦${req.body.price}`
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
}

const addSlider = async (req, res) => {
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
}

const viewSlider = async (req, res) => {
    try {
        const furnishSlider = await FurnishSlider.find({})

        res.send(furnishSlider)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const viewCatalogue = async (req, res) => {
    try {
        const furnishcatalogue = await FurnishCatalogue.find({})

        res.send(furnishcatalogue)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const viewCarousel = async (req, res) => {
    try {
        const furnishCarousel = await FurnishCarousel.find({})

        res.send(furnishCarousel)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const updateCarousel =  async (req, res) => {
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
}

const updateSlider =  async (req, res) => {
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
}

const updateCatalogue =  async (req, res) => {
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
        const furnishCatalogue = await FurnishCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishCatalogue) {
            return res.status(404).send()
        }
        await furnishCatalogue.save()
        res.send(furnishCatalogue)
    } catch (e) {
        res.status(400).send(e)
    }
}

const deleteCarousel =  async (req, res) => {
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
}

const deleteSlider =  async (req, res) => {
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
}

const deleteCatalogue =  async (req, res) => {
    try {
        const furnishCatalogue = await FurnishCatalogue.findByIdAndDelete(req.params.id)

        if (!furnishCatalogue) {
            return res.status(404).send()
        }
        furnishCatalogue.remove()
        res.send(furnishCatalogue)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue }

// module.exports = { addCarousel, addSlider, viewCarousel, viewSlider, updateCarousel, updateSlider, deleteSlider, deleteCarousel }