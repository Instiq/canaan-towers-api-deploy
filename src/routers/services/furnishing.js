const express = require('express')
const Furnishing = require('../../models/services/furnishing')
const authAdmin = require('../../middleware/authAdmin')
const upload = require('../../middleware/multer')
const router = new express.Router() 


// Create Service Endpoint
router.post('/furnish', authAdmin, upload.fields([{ name: 'carousel', maxCount: 3 }, { name: 'slider', maxCount: 3 }]), async (req, res) => {
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
    const furnishing = new Furnishing({...req.body, carousel, slider })
    try {
        await furnishing.save()
        res.status(201).send(furnishing)
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// View Service
router.get('/furnish', async (req, res) => {
    try {
        const furnishing = await Furnishing.find({})
        res.send(furnishing)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// Update service 
// NB: You need to update this so that the admin doesnt need to put the id, 
// idea you can actually find all the furnish service since it is one then you update it with found
router.patch('/furnish/:id', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'carousel', 'slider']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation);

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const furnishing = await Furnishing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!furnishing) {
            return res.status(404).send()
        }

        res.send(furnishing)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete service
router.delete('/furnish/:id', authAdmin, async (req, res) => {
    try {
        const furnishing = await Furnishing.findByIdAndDelete(req.params.id)

        if (!furnishing) {
            return res.status(404).send()
        }
        res.send(furnishing)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
