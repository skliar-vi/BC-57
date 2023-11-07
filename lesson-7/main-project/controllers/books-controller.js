const { HttpError } = require('../helpers')
const { errorHandler } = require('../utils')
const { Book } = require('../models/books')

const getAllBooks = async (req, res, next) => {
    const books = await Book.find()

    res.json(books)
}

const findById = async (req, res, next) => {
    const { id } = req.params
    // const book = await Book.find({ _id: id })
    // const book = await Book.findOne({ _id: id })
    const book = await Book.findById(id)

    if (!book) {
        throw HttpError(404)
    }

    res.json(book)
}

const createBook = async (req, res, next) => {
    const book = await Book.create(req.body)

    return res.status(201).json(book)
}

const updateBook = async (req, res, next) => {
    const { id } = req.params
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true })

    if (!book) {
        throw HttpError(404)
    }

    res.json(book)
}

const updateBookFavorite = async (req, res, next) => {
    const { id } = req.params
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true })

    if (!book) {
        throw HttpError(404)
    }

    res.json(book)
}

const deleteBook = async (req, res, next) => {
    const { id } = req.params

    const book = await Book.findByIdAndDelete(id)

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
    updateBookFavorite: errorHandler(updateBookFavorite),
    deleteBook: errorHandler(deleteBook),
}