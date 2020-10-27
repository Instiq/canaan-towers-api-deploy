const mongoose = require('mongoose');
const validator = require('validator');

const Quotes = mongoose.model('Quotes', {
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
        type: Number,
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
        required: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('You must send a message !!!')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Quotes;