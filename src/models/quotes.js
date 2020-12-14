const mongoose = require('mongoose');
const validator = require('validator');

const quotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            } 
        }
    }, 
    number: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value < 11) {
                throw new Error('Invalid phone number') 
            }
        }
    },
    message: {
        type: String,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('You must send a message !!!')
            }
        }
    },
    image: { 
        type: String
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
}) 

const Quotes = mongoose.model('Quotes', quotesSchema)

module.exports = Quotes;  