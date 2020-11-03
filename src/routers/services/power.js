const express = require('express')
const Power = require('../../models/services/power')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Create Service Endpoint
router.post('/power', authAdmin, upload.fields([{ name: 'carousel', maxCount: 3 }, { name: 'slider', maxCount: 3 }]), async (req, res) => {
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
    const power = new Power({...req.body, carousel, slider })
    try {
        await power.save()
        res.status(201).send(power)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View Service
router.get('/power', async (req, res) => {
    try {
        const power = await Power.find({})
        res.send(power)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Update service 
// NB: You need to update this so that the admin doesnt need to put the id, 
// idea you can actually find all the power service since it is one then you update it with found
router.patch('/power/:id', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'carousel', 'slider']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const power = await Power.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!power) {
            return res.status(404).send()
        }

        res.send(power)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete service
router.delete('/power/:id', authAdmin, async (req, res) => {
    try {
        const power = await Power.findByIdAndDelete(req.params.id)

        if (!power) {
            return res.status(404).send()
        }
        res.send(power)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
