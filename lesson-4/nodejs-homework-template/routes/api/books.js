const express = require('express')
const booksService = require('../../models/books/index')
const router = express.Router()
const HttpError = require('../../helpers/http-error')
const Joi = require('joi')

const bookSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required"
    }),
    author: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
    try {
        const books = await booksService.getAllBooks()

        res.json(books)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        // console.log(req.params);
        const { id } = req.params
        const book = await booksService.getById(id)

        if (!book) {
            // res.status(404).json({
            //     message: 'Book not found'
            // })
            // const error = new Error('Book not found')
            // error.status = 404
            // throw error
            throw HttpError(404)
        }

        res.json(book)
    }
    catch (err) {
        // return res.status(500).json({
        //     message: 'Internal server error'
        // })
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { error } = bookSchema.validate(req.body)

        if (error) {
            throw HttpError(400, error.message)
        }

        const book = await booksService.createBook(req.body)

        return res.status(201).json(book)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = bookSchema.validate(req.body)

        if (error) {
            throw HttpError(400, error.message)
        }

        const { id } = req.params
        const book = await booksService.updateById(id, req.body)

        if (!book) {
            throw HttpError(404)
        }

        res.json(book)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const book = await booksService.deleteBook(id)

        if (!book) {
            throw HttpError(404)
        }

        // res.json(book)
        res.json({
            message: "Book successfully deleted"
        })
        // res.status(204).send()
    } catch (err) {
        next(err)
    }
})

module.exports = router 