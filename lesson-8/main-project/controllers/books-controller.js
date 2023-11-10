const { HttpError } = require('../helpers')
const { errorHandler } = require('../utils')
const { Book } = require('../models/books')

const getAllBooks = async (req, res, next) => {
    const { _id } = req.user

    const books = await Book.find({ owner: _id }, "-createdAt -updatedAt")
        .populate('owner', 'firstname lastname email')

    res.json(books)
}

const findById = async (req, res, next) => {
    const { id } = req.params
    const { _id: owner } = req.user

    // const book = await Book.find({ _id: id })
    const book = await Book.findOne({ _id: id, owner })
    // const book = await Book.findById(id)

    if (!book) {
        throw HttpError(404)
    }

    res.json(book)
}

const createBook = async (req, res, next) => {
    const { _id } = req.user

    const book = await Book.create({ ...req.body, owner: _id })

    return res.status(201).json(book)
}

const updateBook = async (req, res, next) => {
    const { _id: owner } = req.user
    const { id } = req.params

    const result = await Book.updateOne({ _id: id, owner }, req.body, { new: true })

    if (!result.modifiedCount) {
        throw HttpError(404)
    }

    const book = await Book.findById(id)

    res.json(book)
}

const updateBookFavorite = async (req, res, next) => {
    const { _id: owner } = req.user
    const { id } = req.params

    const result = await Book.updateOne({ _id: id, owner }, req.body, { new: true })

    if (!result.modifiedCount) {
        throw HttpError(404)
    }

    const book = await Book.findById(id)

    res.json(book)
}

const deleteBook = async (req, res, next) => {
    const { id } = req.params
    const { _id: owner } = req.user

    const result = await Book.deleteOne({ _id: id, owner })

    if (!result.deletedCount) {
        throw HttpError(404)
    }

    res.json({
        message: "Book successfully deleted",
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