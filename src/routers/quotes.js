const express = require('express')
const Quotes = require('../models/quotes')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router()  


// Quotes Endpoint
router.post('/quotes', auth, async (req, res) => {
    const quotes = new Quotes({
        ...req.body,
        owner: req.user._id
    })


    try {
        await quotes.save()
        res.status(201).send(quotes)
    } catch (e) {
        res.status(400).send(e)
    }
}) 

// THis returns all the quotes and it should  only be avalilBLE TO THE ADNMMINF and whT YIOU CAN DO IS THAT ADD the id of the admin in the documnent and make sure for before yhou return all the quotes you m ust be signed in to the route with the admin id *!!!!!!!
router.get('/admin/quotes', authAdmin, async (req, res) => {
    try {
        // const quotes = await Quotes.find({}) 
        const permission = await Admin.findOne({ 'role': '1' })
        // console.log('hello', req.headers)
        // if(!permission) {
        //     res.status(400).send()
        // }
        res.send('quotes')
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

router.get('/quotes', auth, async (req, res) => {
    try {
        await req.user.populate('quotes').execPopulate()
        res.send(req.user.quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

router.get('/quotes/:id', auth, async (req, res) => { 
    const _id = req.params.id

    try {
        const quotes = await Quotes.findOne({ _id, owner: req.user._id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

router.patch('/quotes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'number', 'message']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const quotes = await Quotes.findOne({ _id: req.params.id, owner: req.user._id})

        if (!quotes) {
            return res.status(404).send()
        }

        updates.forEach((update) => quotes[update] = req.body[update])
        await quotes.save()

        res.send(quotes)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/quotes/:id', auth, async (req, res) => {
    try {
        const quotes = await Quotes.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.status(200).send(quotes)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router