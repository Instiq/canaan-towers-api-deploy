const express = require('express')
const upload = require('../middleware/multer')
const { createAdmin, createsubAdmin, revokeAdmin, activeAdmin, viewsubAdmin, singleLogout, logoutAll, updateProfile, adminLogin } = require('../controllers/admin')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router() 



// admin Endpoint
router.post('/admin', createAdmin)

// Create subadmin
router.post('/admin/create', authAdmin, createsubAdmin)

// Revoke Subdmin access
router.patch('/admin/revoke/:id', authAdmin, revokeAdmin)

// Make Admin Active
router.patch('/admin/active/:id', authAdmin, activeAdmin)

// Admin Login
router.post('/admin/login', adminLogin)

// Admin view quote ensure you add the auth later
// View all subadmins  
router.get('/admins', authAdmin, viewsubAdmin)

// View your profile
// Really needed ????? 
router.get('/admin/profile', authAdmin, async (req, res) => { 
    res.send(req.admin)
})


router.post('/admin/logout', authAdmin, singleLogout)

router.post('/admin/logout/all', authAdmin, logoutAll)

// Update profile
// only superadmin
router.patch('/admin/profile', authAdmin, updateProfile)


// Delete subAdmin by ID ***Only Super Admin
router.delete('/admin/profile', authAdmin, async (req, res) => {
    try {
        await req.admin.remove()
        res.send(req.admin)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router