const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseSaveError } = require('../helpers')
const roles = require('../const/roles')

const emailRegexp = /^\S+@\S+\.\S+$/

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegexp
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    token: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: roles,
        default: 'guest'
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.post('save', handleMongooseSaveError)

const registrationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

const signInSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

const User = model('user', userSchema)

module.exports = {
    User,
    shemas: {
        registrationSchema,
        signInSchema,
    }
}