const { HttpError, cloudinary } = require('../helpers')
const { errorHandler } = require('../utils')
const { Book } = require('../models/books')
const { rename, writeFile } = require('fs/promises')
const path = require('path')

const coversDirPath = path.resolve('public', 'covers')

const buildCoverName = (userId, originalName) => {
    return `${Date.now()}-${userId}-${originalName}`
}


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

    // Disk storage
    const { path: tempPath, filename } = req.file
    // await rename(tempPath, path.join(coversDirPath, filename))
    // const cover = path.join('covers', filename)

    // const { buffer, originalname } = req.file
    // const filename = buildCoverName(req.user._id, originalname)
    // await writeFile(path.join(coversDirPath, filename), buffer)
    // const cover = path.join('covers', filename)

    const { url: cover } = await cloudinary.uploader.upload(tempPath, {
        folder: 'covers',
    })
    const book = await Book.create({ ...req.body, owner: _id, cover })

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

const uploadCover = async (req, res, next) => {
    const { _id: owner } = req.user
    const { id } = req.params

    const { path: tempPath, filename } = req.file

    // const { buffer, originalname } = req.file
    // const filename = buildCoverName(req.user._id, originalname)

    // await writeFile(path.join(coversDirPath, filename), buffer)

    // const cover = path.join('covers', filename)

    const { url: cover } = await cloudinary.uploader.upload(tempPath, {
        folder: 'covers',
    })

    const result = await Book.updateOne({ _id: id, owner }, { cover }, { new: true })

    if (!result.modifiedCount) {
        throw HttpError(404)
    }

    const book = await Book.findById(id)

    res.json(book)
}

module.exports = {
    getAllBooks: errorHandler(getAllBooks),
    findById: errorHandler(findById),
    createBook: errorHandler(createBook),
    updateBook: errorHandler(updateBook),
    updateBookFavorite: errorHandler(updateBookFavorite),
    deleteBook: errorHandler(deleteBook),
    uploadCover: errorHandler(uploadCover)
}