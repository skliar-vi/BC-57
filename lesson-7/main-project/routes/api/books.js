const express = require('express')
const router = express.Router()
const { isValidId } = require('../../middlewares')
const booksController = require('../../controllers/books-controller')
const { schemas: { addBookSchema, updateBookFavoriteSchema } } = require('../../models/books')
const { validateBody } = require('../../utils')

router.route('/')
    .get(booksController.getAllBooks)
    .post(validateBody(addBookSchema), booksController.createBook);

router.route('/:id')
    .all(isValidId)
    .get(booksController.findById)
    .put(validateBody(addBookSchema), booksController.updateBook)
    .patch(validateBody(updateBookFavoriteSchema), booksController.updateBookFavorite)
    .delete(booksController.deleteBook)

module.exports = router 