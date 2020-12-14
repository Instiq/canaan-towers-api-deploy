const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    }],
    role: {
        type: String,
        required: true 
    },
    active: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
});

adminSchema.virtual('quotes', {
    ref: 'Quotes',
    localField: '_id',
    foreignField: 'owner'
}) 


adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens

    return adminObject
}

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1 hour'})

    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}
 
adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new Error('Email or password incorrect')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Email or password incorrect')
    }

    return admin
}

// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin; 