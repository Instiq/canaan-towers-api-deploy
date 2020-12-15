const { FurnishSlider, FurnishCarousel, FurnishCatalogue }  = require('../../models/services/furnishing')
const { success, errorout } = require('../../responseFormatter/response')

const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }

    const furnishCarousel = new FurnishCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })

    try {
        await furnishCarousel.save()
        res.status(201).json(success(furnishCarousel))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addCatalogue = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
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
        res.status(201).json(success(furnishcatalogue))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }
    const furnishslider = new FurnishSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await furnishslider.save()
        res.status(201).json(success(furnishslider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const viewSlider = async (req, res) => {
    try {
        const furnishSlider = await FurnishSlider.find({})

        res.status(200).json(success(furnishSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCatalogue = async (req, res) => {
    try {
        const furnishcatalogue = await FurnishCatalogue.find({})

        res.status(200).json(success(furnishcatalogue))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCarousel = async (req, res) => {
    try {
        const furnishCarousel = await FurnishCarousel.find({})

        res.status(200).json(success(furnishCarousel))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const updateCarousel =  async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).json(errorout('Bad request','Invalid updates!' ))
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const furnishCarousel = await FurnishCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await furnishCarousel.save()
        res.status(200).json(success(furnishCarousel))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message)) 
    }
}

const updateSlider =  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).json(errorout('Bad request',  'Invalid updates!'))
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const furnishSlider = await FurnishSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await furnishSlider.save()
        res.status(200).json(success(furnishSlider))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}

const updateCatalogue =  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'description', 'item', 'specification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).json(errorout('Bad request',  'Invalid updatesss!'))
    }

    if(req.file) {
        let image = `${process.env.DEPLOYED_URL}/${req.file.filename}`
        req.body = { ...req.body, image }
    }

    // req.body.price = `₦${req.body.price}`
    
    try {
        const furnishCatalogue = await FurnishCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await furnishCatalogue.save()
        res.status(200).json(success(furnishCatalogue))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}

const deleteCarousel =  async (req, res) => {
    try {
        const furnishCarousel = await FurnishCarousel.findByIdAndDelete(req.params.id)

        if (!furnishCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        furnishCarousel.remove()
        res.status(200).json(success(furnishCarousel))
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteSlider =  async (req, res) => {
    try {
        const furnishSlider = await FurnishSlider.findByIdAndDelete(req.params.id)

        if (!furnishSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        furnishSlider.remove()
        res.status(200).json(success(furnishSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteCatalogue =  async (req, res) => {
    try {
        const furnishCatalogue = await FurnishCatalogue.findByIdAndDelete(req.params.id)

        if (!furnishCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        furnishCatalogue.remove()
        res.status(200).json(success(furnishCatalogue))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue }

