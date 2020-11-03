const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: { 
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
                throw new Error('Invalid phone number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value < 7) {
                throw new Error('Password should not be less than 8 characters')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('quotes', {
    ref: 'Quotes',
    localField: ['_id'],
    foreignField: 'owner'
}) 


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() 

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {  
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_USER, { expiresIn: '1 hour'})

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Email or password incorrect')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Email or password incorrect')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
     
    console.log('only checking')
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() 
})

const User = mongoose.model('User', userSchema )

module.exports = User;