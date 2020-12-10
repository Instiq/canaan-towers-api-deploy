const jwt = require('jsonwebtoken')
const Admin = require('../models/admin') 


const authAdmin = async (req, res, next) => {
    console.log('before', req.header)
    try { 
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN)
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
 
        if (!admin) { 
            throw new Error()
        }

        req.id = decoded._id
        req.token = token
        req.admin = admin
        next() 
    
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = authAdmin