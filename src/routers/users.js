const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const { sendWelcomeEmail, sendCancelationEmail } = require('../email/account')
const router = new express.Router() 

// Users Endpoint 
router.post('/users', async (req, res) => {
    const user = new User(req.body) 

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.firstname)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users', authAdmin, async (req, res) => { 
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send('Error occured')
    }
})

router.get('/users/profile', auth, async (req, res) => { 
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logout/all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/users/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname','lastname', 'email', 'password', 'number']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}) 


router.delete('/users/profile', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.firstname)
        res.send(req.user)
    } catch (e) {
        res.status(500).send() 
    }
})

module.exports = router

