const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseSaveError } = require('../helpers')

const genres = ['Drama', 'Historical', 'Detective', "Fantasy"]
const datePattern = /^\d{2}-\d{2}-\d{4}$/ // 21-12-2023

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: genres,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: String,
        match: datePattern,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, { versionKey: false, timestamps: true });


const addBookSchema = Joi.object({
    title: Joi.string().required().messages({
    }),
    author: Joi.string().required(),
    genre: Joi.string().valid(...genres).required(),
    isFavorite: Joi.boolean(),
    publishedAt: Joi.string().pattern(datePattern).required(),
})

const updateBookFavoriteSchema = Joi.object({
    isFavorite: Joi.boolean().required(),
})

bookSchema.post('save', handleMongooseSaveError)

const Book = model('book', bookSchema)

module.exports = {
    schemas: {
        addBookSchema,
        updateBookFavoriteSchema,
    },
    Book
};