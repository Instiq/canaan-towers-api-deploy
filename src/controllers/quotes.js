const Quotes = require('../models/quotes')
const { notifyCustomerQuoteSent, notifyAdminQuoteSent } = require('../email/account')
const { success, error } = require('../responseFormatter/response')


const createQuote = async (req, res) => {
    if(req.file) {
        const quotes = new Quotes({
            ...req.body,
            image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        })
        try {
            await quotes.save()
            res.status(201).json(success({ quotes }))
        } catch (error) {
            res.status(400).json(error('Bad request', error.message)) 
        } 
    } else {
        const quotes = new Quotes({
            ...req.body
        }) 
        try {
            await quotes.save()
            res.status(201).json(success({ quotes }))
            notifyCustomerQuoteSent(req.body.email, req.body.name)
            notifyAdminQuoteSent(req.body.name)
        } catch (error) {
            res.status(400).json(error('Bad request', error.message)) 
        }
    }
} 

 
const viewQuotes = async (req, res) => {
    try {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const quotes = await Quotes.find({})
        .limit(pagination)
        .skip((page - 1) * pagination)
        res.status(200).json(success({ quotes }))
    } catch (error) {
        res.status(500).json({message: e.message}) 
    }
}

const singleQuote = async (req, res) => { 
    const _id = req.params.id

    try {
        const quotes = await Quotes.findOne({ _id })

        if (!quotes) {
            return res.status(400).json(error('Bad request', error.message))
        }

        res.send(quotes)
    } catch (e) {
        res.status(500).json({message: e.message}) 
    }
}

const deleteQuote = async (req, res) => {
    try {
        const quotes = await Quotes.findByIdAndDelete({ _id: req.params.id })

        if (!quotes) {
            return res.status(404).json(error('Bad request', "Quote doesn't exist"))
        }

        res.status(200).json(success({ quotes }))

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = { createQuote, viewQuotes, singleQuote, deleteQuote }