const { BuildSlider, BuildingCarousel }  = require('../../models/services/building')
const { success, errorout } = require('../../responseFormatter/response')

const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }
    const buildingCarousel = new BuildingCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })

    try {
        await buildingCarousel.save()
        res.status(201).json(success(buildingCarousel))  
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}


const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }
    const buildingslider = new BuildSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    })

    try {
        await buildingslider.save()
        res.status(201).json(success(buildingslider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
    }
}


const viewSlider = async (req, res) => {
    try {
        const buildSlider = await BuildSlider.find({})

        res.status(200).json(success(buildSlider))
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}
const viewCarousel = async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.find({})
        res.status(200).json(success(buildingCarousel))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateCarousel = async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).json(errorout('Bad request',  'Invalid updates!'))
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const buildingCarousel = await BuildingCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!buildingCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await buildingCarousel.save()
        res.status(200).json(success(buildingCarousel))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
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

    req.body = { ...req.body, image: image }
    
    try {
        const buildSlider = await BuildSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!buildSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await buildSlider.save()
        res.status(200).json(success(buildSlider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
    }
}

const deleteSlider = async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.findByIdAndDelete(req.params.id)

        if (!buildingCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        buildingCarousel.remove()
        res.status(200).json(success(buildingCarousel))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteCarousel = async (req, res) => {
    try {
        const buildingCarousel = await BuildingCarousel.findByIdAndDelete(req.params.id)

        if (!buildingCarousel) {
            return res.status(404).send()
        }
        buildingCarousel.remove()
        res.status(200).json(success(buildingCarousel))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = { addCarousel, addSlider, viewCarousel, viewSlider, updateCarousel, updateSlider, deleteSlider, deleteCarousel }