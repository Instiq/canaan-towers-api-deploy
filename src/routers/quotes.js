const express = require('express')
const Quotes = require('../models/quotes')
const authAdmin = require('../middleware/authAdmin')
const upload = require('../middleware/multer')
const { ObjectID } = require('mongodb')
const router = new express.Router()   
const { notifyCustomerQuoteSent, notifyAdminQuoteSent } = require('../email/account')


// Quotes Endpoint
router.post('/quotes', upload.single('image'), async (req, res) => {
    if(req.body.items) {
        req.body.items = {...req.body.items, _id: new ObjectID}
    }

    notifyCustomerQuoteSent(req.body.email, req.body.name)
    notifyAdminQuoteSent(req.body.name)

    

    if(req.file) {
        const quotes = new Quotes({
            ...req.body,
            image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        })
        try {
            await quotes.save()
            res.status(201).send(quotes)
        } catch (e) {
            res.status(400).send(e)
        } 
    } else {
        const quotes = new Quotes({
            ...req.body
        }) 
        try {
            await quotes.save()
            res.status(201).send(quotes)
        } catch (e) {
            res.status(400).send(e)
        }
    }

   
}) 
 

// Admin view quote ensure you add the auth later
router.get('/quote/admin', async (req, res) => {
    try {
        console.log('123')
        const quotes = await Quotes.find({})
        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})


// View a single quote
router.get('/quotes/:id', async (req, res) => { 
    const _id = req.params.id

    try {
        const quotes = await Quotes.findOne({ _id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// Admin delete quote
router.delete('/quotes/:id', async (req, res) => {
    try {
        const quotes = await Quotes.findByIdAndDelete({ _id: req.params.id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.status(200).send(quotes)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router