const { RoofSlider, RoofCarousel, RoofCatalogue }  = require('../../models/services/roof')
const { success, errorout } = require('../../responseFormatter/response')


const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }

    const roofCarousel = new RoofCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await roofCarousel.save()
        res.status(201).json(success(roofCarousel))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addCatalogue = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
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
        res.status(201).json(success(roofcatalogue))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }
    const roofslider = new RoofSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await roofslider.save()
        res.status(201).json(success(roofslider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const viewSlider = async (req, res) => {
    try {
        const roofSlider = await RoofSlider.find({})

        res.status(200).json(success(roofSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCatalogue = async (req, res) => {
    try {
        const roofcatalogue = await RoofCatalogue.find({})

        res.status(200).json(success(roofcatalogue))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCarousel = async (req, res) => {
    try {
        const roofCarousel = await RoofCarousel.find({})

        res.status(200).json(success(roofCarousel))
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
        const roofCarousel = await RoofCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await roofCarousel.save()
        res.status(200).json(success(roofCarousel))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message)) 
    }
}

const updateSlider = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).json(errorout('Bad request',  'Invalid updates!'))
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const roofSlider = await RoofSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await roofSlider.save()
        res.status(200).json(success(roofSlider))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}

const updateCatalogue = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'description', 'item', 'specification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log('g', isValidOperation, req.body)
    if (!isValidOperation || !req.file) {
        return res.status(400).json(errorout('Bad request',  'Invalid updates!'))
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}`
    req.body.price = `₦${req.body.price}`

    req.body = { ...req.body, image }
    
    try {
        const roofCatalogue = await RoofCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roofCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await roofCatalogue.save()
        res.status(200).json(success(roofCatalogue))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}

const deleteCarousel = async (req, res) => {
    try {
        const roofCarousel = await RoofCarousel.findByIdAndDelete(req.params.id)

        if (!roofCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        roofCarousel.remove()
        res.status(200).json(success(roofCarousel))
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteSlider = async (req, res) => {
    try {
        const roofSlider = await RoofSlider.findByIdAndDelete(req.params.id)

        if (!roofSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        roofSlider.remove()
        res.status(200).json(success(roofSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteCatalogue = async (req, res) => {
    try {
        const roofCatalogue = await RoofCatalogue.findByIdAndDelete(req.params.id)

        if (!roofCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        roofCatalogue.remove()
        res.status(200).json(success(roofCatalogue))
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue }