const express = require('express')
const authAdmin = require('../middleware/authAdmin')
const { createQuote, viewQuotes, markAsInProgress, markAsResolved, markAsPending, singleQuote, deleteQuote } = require('../controllers/quotes')
const upload = require('../middleware/multer')
const router = new express.Router()   


// Quotes Endpoint
router.post('/quotes', upload.single('image'), createQuote) 


// Admin view quote ensure you add the auth later
router.get('/quote/admin', authAdmin, viewQuotes)


// View a single quote
router.get('/quotes/:id', authAdmin, singleQuote)

// Mark quote as pending
router.patch('/quotes/pending/:id', authAdmin, markAsPending)

// Mark quote as resolved
router.patch('/quotes/resolved/:id', authAdmin, markAsResolved)

// Mark Quote as inProgress
router.patch('/quotes/progress/:id', authAdmin, markAsInProgress)

// Admin delete quote
router.delete('/quotes/:id', authAdmin, deleteQuote)

module.exports = router  