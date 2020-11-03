const express = require('express')
const Automobile = require('../../models/services/automobile')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Create Service Endpoint
router.post('/automobile', authAdmin, upload.fields([{ name: 'carousel', maxCount: 3 }, { name: 'slider', maxCount: 3 }]), async (req, res) => {
    if(req.files){
            if(req.files.carousel) {
                let carousels = [];
                req.files.carousel.forEach(photo => {
                    let url = `${process.env.DEPLOYED_URL}/${photo.filename}`
                    carousels.push(url);
                }); 

                carousel = carousels;
            }
            if(req.files.slider) {
                let sliders = [];
                req.files.slider.forEach(photo => {
                    let url = `${process.env.DEPLOYED_URL}/${photo.filename}`
                    sliders.push(url);
                }); 
                slider = sliders;
            }
    }
    const automobile = new Automobile({...req.body, carousel, slider })
    try {
        await automobile.save()
        res.status(201).send(automobile)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View Service
router.get('/automobile', authAdmin, async (req, res) => {
    try {
        const automobile = await Automobile.find({})
        res.send(automobile)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Update service 
// NB: You need to update this so that the admin doesnt need to put the id, 
// idea you can actually find all the automobile service since it is one then you update it with found
router.patch('/automobile/:id', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'carousel', 'slider']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const automobile = await Automobile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!automobile) {
            return res.status(404).send()
        }

        res.send(automobile)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete service
router.delete('/automobile/:id', authAdmin, async (req, res) => {
    try {
        const automobile = await Automobile.findByIdAndDelete(req.params.id)

        if (!automobile) {
            return res.status(404).send()
        }
        res.send(automobile)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
