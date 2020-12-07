const express = require('express')
const authAdmin = require('../middleware/authAdmin')
const { createQuote, viewQuotes, singleQuote, deleteQuote } = require('../controllers/quotes')
const upload = require('../middleware/multer')
const router = new express.Router()   


// Quotes Endpoint
router.post('/quotes', upload.single('image'), createQuote) 
 

// Admin view quote ensure you add the auth later
router.get('/quote/admin', authAdmin, viewQuotes)


// View a single quote
router.get('/quotes/:id', authAdmin, singleQuote)

// Admin delete quote
router.delete('/quotes/:id', authAdmin, deleteQuote)

module.exports = router  