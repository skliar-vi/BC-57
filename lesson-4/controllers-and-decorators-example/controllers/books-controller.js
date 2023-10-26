const booksService = require('../models/books/index')
const HttpError = require('../helpers/http-error')
const { errorHandler } = require('../utils')

const getAllBooks = async (req, res, next) => {
    const books = await booksService.getAllBooks()

    res.json(books)
}

const findById = async (req, res, next) => {
    const { id } = req.params
    const book = await booksService.getById(id)

    if (!book) {
        throw HttpError(404)
    }

    res.json(book)

}

const createBook = async (req, res, next) => {
    const book = await booksService.createBook(req.body)

    return res.status(201).json(book)
}

const updateBook = async (req, res, next) => {
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
}

const deleteBook = async (req, res, next) => {
    const { id } = req.params

    const book = await booksService.deleteBook(id)

    if (!book) {
        throw HttpError(404)
    }

    res.json({
        message: "Book successfully deleted"
    })
}

module.exports = {
    getAllBooks: errorHandler(getAllBooks),
    findById: errorHandler(findById),
    createBook: errorHandler(createBook),
    updateBook: errorHandler(updateBook),
    deleteBook: errorHandler(deleteBook),
}