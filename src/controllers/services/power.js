const { PowerSlider, PowerCarousel, PowerCatalogue }  = require('../../models/services/power')
const { success, errorout } = require('../../responseFormatter/response')



const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    } 

    const powerCarousel = new PowerCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await powerCarousel.save()
        res.status(201).json(success(powerCarousel))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addCatalogue= async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }

    req.body.price = `₦${req.body.price}`
    const powercatalogue = new PowerCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await powercatalogue.save()
        res.status(201).json(success(powercatalogue))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }
    const powerslider = new PowerSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await powerslider.save()
        res.status(201).json(success(powerslider))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
    }
}

const viewSlider = async (req, res) => {
    try {
        const powerSlider = await PowerSlider.find({})

        res.status(200).json(success(powerSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCatalogue = async (req, res) => {
    try {
        const powercatalogue = await PowerCatalogue.find({})

        res.status(200).json(success(powercatalogue)) 
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const viewCarousel = async (req, res) => {
    try {
        const powerCarousel = await PowerCarousel.find({})

        res.status(200).json(success(powerCarousel))
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
        const powerCarousel = await PowerCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await powerCarousel.save()
        res.status(200).json(success(powerCarousel))
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
        const powerSlider = await PowerSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await powerSlider.save()
        res.status(200).json(success(powerSlider))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}

const updateCatalogue = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'description', 'item', 'specification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation || !req.file) {
        return res.status(400).json(errorout('Bad request',  'Invalid updates!'))
    }

    if(req.file) {
        let image = `${process.env.DEPLOYED_URL}/${req.file.filename}`
        req.body = { ...req.body, image }
    }
    
    try {
        const powerCatalogue = await PowerCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!powerCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await powerCatalogue.save()
        res.status(200).json(success(powerCatalogue))
    } catch (e) {
        res.status(400).json(errorout('Bad request', e.message))
    }
}


const deleteCarousel = async (req, res) => {
    try {
        const powerCarousel = await PowerCarousel.findByIdAndDelete(req.params.id)

        if (!powerCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        powerCarousel.remove()
        res.status(200).json(success(powerCarousel))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteSlider = async (req, res) => {
    try {
        const powerSlider = await PowerSlider.findByIdAndDelete(req.params.id)

        if (!powerSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        powerSlider.remove()
        res.status(200).json(success(powerSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteCatalogue = async (req, res) => {
    try {
        const powerSlider = await PowerSlider.findByIdAndDelete(req.params.id)

        if (!powerSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        powerSlider.remove()
        res.status(200).json(success(powerSlider))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}



module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCatalogue, updateCarousel, updateSlider, deleteCarousel, deleteSlider, deleteCatalogue } 
