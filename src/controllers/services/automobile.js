const { AutomobileSlider, AutomobileCarousel, AutomobileCatalogue }  = require('../../models/services/automobile')

const { success, errorout } = require('../../responseFormatter/response')


const addCarousel = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }

    const automobileCarousel = new AutomobileCarousel({
        carousel: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })


    try {
        await automobileCarousel.save()
        res.status(201).json(success({ automobileCarousel }))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}
 

const addCatalogue = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'Upload an image'))
    }

    req.body.price = `₦${req.body.price}`
    const automobilecatalogue = new AutomobileCatalogue({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description
    }) 


    try {
        await automobilecatalogue.save()
        res.status(201).json(success({ automobilecatalogue }))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
    }
}

const addSlider = async (req, res) => {
    if(!req.file) {
        res.status(400).json(errorout('Bad request', 'You need to upload an image'))
    }
    const automobileslider = new AutomobileSlider({
        ...req.body,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
    })

    try {
        await automobileslider.save()
        res.status(201).json(success({ automobileslider })) 
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message))
    }
}

const viewSlider = async (req, res) => {
    try {
        const automobileSlider = await AutomobileSlider.find({})

        res.status(200).json(success({ automobileSlider })) 
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}

const viewCatalogue = async (req, res) => {
    try {
        const automobilecatalogue = await AutomobileCatalogue.find({})

        res.status(200).json(success({ automobilecatalogue })) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const viewCarousel = async (req, res) => {
    try {
        const automobileCarousel = await AutomobileCarousel.find({})

        res.status(200).json(success({ automobileCarousel }))
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
        const automobileCarousel = await AutomobileCarousel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found')) 
        }
        await automobileCarousel.save()
        res.status(200).json(success({ buildingCarousel }))
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

    req.body = { ...req.body, image }
    
    try {
        const automobileSlider = await AutomobileSlider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await automobileSlider.save()
        res.status(200).json(success({ automobileSlider }))
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


    let image = `${process.env.DEPLOYED_URL}/${req.file.filename}`
    req.body.price = `₦${req.body.price}`

    req.body = { ...req.body, image }
    
    try {
        const automobileCatalogue = await AutomobileCatalogue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobileCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        await automobileCatalogue.save()
        res.status(200).json(success({ automobileCatalogue }))
    } catch (error) {
        res.status(400).json(errorout('Bad request', error.message)) 
    }
}

const deleteCarousel = async (req, res) => {
    try {
        const automobileCarousel = await AutomobileCarousel.findByIdAndDelete(req.params.id)

        if (!automobileCarousel) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        automobileCarousel.remove()
        res.send(automobileCarousel)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteSlider = async (req, res) => {
    try {
        const automobileSlider = await AutomobileSlider.findByIdAndDelete(req.params.id)

        if (!automobileSlider) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        automobileSlider.remove()
        res.status(200).json(success({ automobileSlider }))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const deleteCatalogue = async (req, res) => {
    try {
        const automobileCatalogue = await AutomobileCatalogue.findByIdAndDelete(req.params.id)

        if (!automobileCatalogue) {
            return res.status(404).json(errorout('Bad request', 'Not found'))
        }
        automobileCatalogue.remove()
        res.status(200).json(success({ automobileCatalogue }))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}




module.exports = { addCarousel, addCatalogue, addSlider, viewSlider, viewCatalogue, viewCarousel, updateCarousel, updateSlider, updateCatalogue, deleteCarousel, deleteSlider, deleteCatalogue }
