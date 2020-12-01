const express = require('express')
const upload = require('../middleware/multer')
const Admin = require('../models/admin')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router() 

// admin Endpoint
router.post('/admin', async (req, res) => {
    const admin = new Admin({ ...req.body, role: '1', active: true })
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// Create subadmin
router.post('/admin/create', authAdmin, upload.single('image'), async (req, res) => {
    console.log(req.file)
    if(!req.file) {
        res.status(400).send('You need to upload an image')
        process.exit(1)
    }


    const admin = new Admin({ 
        ...req.body, role: '2',
        active: true,
        image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
    })
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Revoke Subdmin access
router.patch('/admin/revoke/:id', authAdmin, async (req, res) => { 
    try {
        const permission = await Admin.findOne({ _id: req.id, 'role': '1' })
        if(!permission) {
            res.status(401).send()
        }

        req.body.active = false;

        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!admin) {
            return res.status(404).send()
        }

        await admin.save()
        res.send(admin)
    } catch (e) {
        res.status(500).send()
    }
})

// Make Admin Active
router.patch('/admin/active/:id', authAdmin, async (req, res) => { 
    try {
        const permission = await Admin.findOne({ _id: req.id, 'role': '1' })
        if(!permission) {
            res.status(401).send()
        }

        req.body.active = true;

        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!admin) {
            return res.status(404).send()
        }

        await admin.save()
        res.send(admin)
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.status(200).json({
            status: 'success',
            message: 'Ok',
            data: { admin, token }
        })
    } catch (e) {
        res.status(400).send()
    }
})

// Admin view quote ensure you add the auth later
// View all subadmins  
router.get('/admins', authAdmin, async (req, res) => { 
    try {
        const permission = await Admin.findOne({ _id: req.id, 'role': '1' })
        if(!permission) {
            res.status(400).send()
        }
        const admin = await Admin.find({ 'role': '2'})
        res.send(admin)
    } catch (e) {
        res.status(500).send('Server issues')
    }
})




// View your profile
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

// Update profile
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




router.delete('/admin/upload', authAdmin, async (req, res) => {
    req.admin.avatar = undefined
    await req.admin.save()
    res.send()
})

router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)

        if (!admin) {
            throw new Error()
        }

        // res.set('Content-Type', 'image/png')
        res.status(200).send(admin)
    } catch (e) {
        res.status(404).send()
    }
})




module.exports = router