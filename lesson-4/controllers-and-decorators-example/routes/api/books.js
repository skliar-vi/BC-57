const express = require('express')
const router = express.Router()

const booksController = require('../../controllers/books-controller')
const { bookSchema } = require('../../schemas/book-schema')
const { validateBody } = require('../../utils')

router.get('/', booksController.getAllBooks)

router.get('/:id', booksController.findById)

router.post('/', validateBody(bookSchema), booksController.createBook)

router.put('/:id', validateBody(bookSchema), booksController.updateBook)

router.delete('/:id', booksController.deleteBook)

module.exports = router 