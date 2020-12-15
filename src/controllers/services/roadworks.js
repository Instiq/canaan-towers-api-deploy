const { RoadCarousel, RoadSlider}  = require('../../models/services/roadworks')
const { success, errorout } = require('../../responseFormatter/response')


const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }

    const roadCarousel = new RoadCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await roadCarousel.save()
        res.status(201).json(success(roadCarousel))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}


const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }
    const roadslider = new RoadSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    })

    try {
        await roadslider.save()
        res.status(201).json(success(roadslider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const viewSlider =  async (req, res) => {
    try {
        const roadSlider = await RoadSlider.find({})

        res.status(200).json(success(roadSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCarousel =  async (req, res) => {
    try {
        const roadCarousel = await RoadCarousel.find({})

        res.status(200).json(success(roadCarousel))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


const updateCarousel = async (req, res) => {
    if (!req.file || req.file.length > 1) {
        return res.status(400).json(errorout('Bad request','Invalid updates!' ))
    }

    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, carousel: image }

    try {
        const roadCarousel = await RoadCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roadCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await roadCarousel.save()
        res.status(200).json(success(roadCarousel))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message)) 
    }
}


const updateSlider = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.file) {
        return res.status(400).json(errorout('Bad request','Invalid updates!' ))
    }


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}` 

    req.body = { ...req.body, image }
    
    try {
        const roadSlider = await RoadSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roadSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await roadSlider.save()
        res.status(200).json(success(roadSlider))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message)) 
    }
}

const deleteCarousel = async (req, res) => {
    try {
        const roadCarousel = await RoadCarousel.findByIdAndDelete(req.params.id)

        if (!roadCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        roadCarousel.remove()
        res.status(200).json(success(roadCarousel))
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteSlider = async (req, res) => {
    try {
        const roadSlider = await RoadSlider.findByIdAndDelete(req.params.id)

        if (!roadSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        roadSlider.remove()
        res.status(200).json(success(roadSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = { addCarousel, addSlider, viewSlider, viewCarousel, updateCarousel, updateSlider, deleteCarousel, deleteSlider }

// module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue }