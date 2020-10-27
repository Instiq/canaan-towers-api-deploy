const express = require('express')
const multer = require('multer')
const Admin = require('../models/admin')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router() 

// admin Endpoint
router.post('/admin', async (req, res) => {
    const admin = new Admin({ ...req.body, role: '1'})
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send()
    }
})


router.get('/admins', authAdmin, async (req, res) => { 
    try {
        const permission = await Admin.findOne({ 'role': '1' })
        console.log(permission)
        if(!permission) {
            res.status(400).send()
        }

        const admin = await Admin.find({})
        res.send(admin)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/profile', authAdmin, async (req, res) => { 
    res.send(req.admin)
})

router.post('/admin/logout', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/admin/logout/all', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/admin/profile', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname','lastname', 'email', 'password', 'number']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.admin[update] = req.body[update])
        await req.admin.save()
        res.send(req.admin)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/admin/profile', authAdmin, async (req, res) => {
    try {
        await req.admin.remove()
        res.send(req.admin)
    } catch (e) {
        res.status(500).send()
    }
})


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/admin/upload', authAdmin, upload.single('avatar'), async (req, res) => {
    req.admin.avatar = req.file.buffer
    await req.admin.save()
    res.send('Upload successful')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/admin/upload', authAdmin, async (req, res) => {
    req.admin.avatar = undefined
    await req.admin.save()
    res.send()
})

router.get('/admin/:id/avatar', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)

        if (!admin || !admin.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.status(200).send(admin.avatar)
    } catch (e) {
        res.status(404).send()
    }
})




module.exports = router