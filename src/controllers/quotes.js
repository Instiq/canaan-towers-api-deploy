const Quotes = require('../models/quotes')
const { notifyCustomerQuoteSent, notifyAdminQuoteSent } = require('../email/account')


const createQuote = async (req, res) => {
    if(req.file) {
        const quotes = new Quotes({
            ...req.body,
            image: `${process.env.DEPLOYED_URL}/${req.file.filename}`,
        })
        try {
            await quotes.save()
            res.status(201).send(quotes)
        } catch (e) {
            res.status(400).send(e)
        } 
    } else {
        const quotes = new Quotes({
            ...req.body
        }) 
        try {
            await quotes.save()
            res.status(201).send(quotes)
            notifyCustomerQuoteSent(req.body.email, req.body.name)
            notifyAdminQuoteSent(req.body.name)
        } catch (e) {
            res.status(400).send(e)
        }
    }
}


const viewQuotes = async (req, res) => {
    try {
        console.log('123')
        const quotes = await Quotes.find({})
        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const singleQuote = async (req, res) => { 
    const _id = req.params.id

    try {
        const quotes = await Quotes.findOne({ _id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.send(quotes)
    } catch (e) {
        res.status(500).send('Error occured')
    }
}

const deleteQuote = async (req, res) => {
    try {
        const quotes = await Quotes.findByIdAndDelete({ _id: req.params.id })

        if (!quotes) {
            return res.status(404).send()
        }

        res.status(200).send(quotes)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = { createQuote, viewQuotes, singleQuote, deleteQuote }