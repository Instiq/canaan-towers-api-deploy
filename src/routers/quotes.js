const express = require('express')
const Quotes = require('../models/quotes')
const Admin = require('../models/admin') 
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router()   


// const main = async () => {
//     const quotes = await Quotes.findById('5fa01424aab6f33948b68866')
//     await quotes.populate('owner').execPopulate()
//     delete quotes.owner.firstname;
//     // console.log(quotes.owner)
//     quoteUser = {...quotes}
//     delete quoteUser._doc._id
// }

// main()



// Quotes Endpoint
router.post('/quotes', auth, async (req, res) => {
    // delete (req.user.tokens)
    console.log(req.user)
    let user = {...req.user}
    delete user._doc.tokens
    delete user._doc.password
    const quotes = new Quotes({
        ...req.body,
        person: user._doc
    })

    try {
        await quotes.save()
        res.status(201).send(quotes)
    } catch (e) {
        res.status(400).send(e)
    }
}) 

router.get('/admins', authAdmin, async (req, res) => {
    try {
        const quotes = await Quotes.find({})
        // const permission = await Admin.findOne({ 'role': '1' })
        // console.log('hello', req.headers)
        // if(!permission) {
        //     res.status(400).send()
        // }
        console.log('123')
        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// View all your quotes
router.get('/quotes/yours', auth, async (req, res) => {
    try {
        await req.user.populate('quotes').execPopulate()
        res.send(req.user.quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

// View a single quote
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