const express = require('express')
const Roadworks = require('../../models/services/roadworks')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Create Service Endpoint
router.post('/roadworks', authAdmin, upload.fields([{ name: 'carousel', maxCount: 3 }, { name: 'slider', maxCount: 3 }]), async (req, res) => {
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
    const roadworks = new Roadworks({...req.body, carousel, slider })
    try {
        await roadworks.save()
        res.status(201).send(roadworks)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View Service
router.get('/roadworks', async (req, res) => {
    try {
        const roadworks = await Roadworks.find({})
        res.send(roadworks)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Update service 
// NB: You need to update this so that the admin doesnt need to put the id, 
// idea you can actually find all the roadworks service since it is one then you update it with found
router.patch('/roadworks/:id', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'carousel', 'slider']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const roadworks = await Roadworks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!roadworks) {
            return res.status(404).send()
        }

        res.send(roadworks)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete service
router.delete('/roadworks/:id', authAdmin, async (req, res) => {
    try {
        const roadworks = await Roadworks.findByIdAndDelete(req.params.id)

        if (!roadworks) {
            return res.status(404).send()
        }
        res.send(roadworks)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
