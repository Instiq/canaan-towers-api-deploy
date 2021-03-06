const Quotes = require('../models/quotes')
const { notifyCustomerQuoteSent, notifyAdminQuoteSent } = require('../email/account')
const { success, errorout } = require('../responseFormatter/response')


const createQuote = async (req, res) => {
    req.body.active = 'true'
    if(req.file) {
        const quotes = new Quotes({
            ...req.body,
            image: `${process.env.DEPLOYED_URL}/${req.file.filename}`
        })
        try {
            await quotes.save()
            notifyCustomerQuoteSent(req.body.email, req.body.name)
            notifyAdminQuoteSent(req.body.name)
            res.status(201).json(success({ quotes }))
        } catch (error) {
            res.status(400).json(errorout('Bad request', error.message)) 
        } 
    } else { 
        const quotes = new Quotes({
            ...req.body
        }) 
        try {
            await quotes.save()
            notifyCustomerQuoteSent(req.body.email, req.body.name)
            notifyAdminQuoteSent(req.body.name)
            res.status(201).json(success({ quotes }))
        } catch (error) {
            res.status(400).json(errorout('Bad request', error.message)) 
        }
    }
} 


const viewQuotes = async (req, res) => {
    try {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const count = await Quotes.countDocuments({}).exec();
        const quotes = await Quotes.find({})
        .limit(pagination)
        .skip((page - 1) * pagination)

        res.status(200).json(success({ quotes, count }))
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}


const markAsPending = async (req, res) => { 
    try {
        req.body.active = 'true';

        const quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!quotes) {
            return res.status(404).json(errorout('Bad request', 'Quote not found'))
        }

        await quotes.save()
        res.status(200).json(success({ quotes }))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const markAsResolved = async (req, res) => { 
    try {
        req.body.active = 'false';

        const quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!quotes) {
            return res.status(404).json(errorout('Bad request', 'Quote not found'))
        }

        await quotes.save()
        res.status(200).json(success({ quotes }))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const markAsInProgress = async (req, res) => { 
    try {
        req.body.active = 'inProgress';

        const quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!quotes) {
            return res.status(404).json(errorout('Bad request', 'Quote not found'))
        }

        await quotes.save()
        res.status(200).json(success({ quotes }))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


const singleQuote = async (req, res) => { 
    const _id = req.params.id

    try {
        const quotes = await Quotes.findOne({ _id })

        if (!quotes) {
            return res.status(400).json(errorout('Bad request', error.message))
        }

        res.status(200).json(success(quotes))
    } catch (e) {
        res.status(500).json({message: e.message}) 
    }
}

const deleteQuote = async (req, res) => {
    try {
        const quotes = await Quotes.findByIdAndDelete({ _id: req.params.id })

        if (!quotes) {
            return res.status(404).json(errorout('Bad request', "Quote doesn't exist"))
        }

        res.status(200).json(success(quotes))

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = { createQuote, viewQuotes, markAsInProgress, markAsResolved, markAsPending, singleQuote, deleteQuote }