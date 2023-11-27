const express = require('express')
const router = express.Router()
const { isValidId, authenticate, can, upload } = require('../../middlewares')
const booksController = require('../../controllers/books-controller')
const { schemas: { addBookSchema, updateBookFavoriteSchema } } = require('../../models/books')
const { validateBody } = require('../../utils')
const { Read, Create, Update, Delete } = require('../../const/permissions')

router.use(authenticate);

router.route('/')
    // .all(authenticate)
    .get(can(Read), booksController.getAllBooks)
    .post(upload.single('cover'), can(Create), validateBody(addBookSchema), booksController.createBook);

router
    .patch('/:id/cover', upload.single('cover'), can(Update), booksController.uploadCover)

router.route('/:id')
    .all(isValidId)
    .get(can(Read), booksController.findById)
    .put(can(Update), validateBody(addBookSchema), booksController.updateBook)
    .patch(can(Update), validateBody(updateBookFavoriteSchema), booksController.updateBookFavorite)
    .delete(can(Delete), booksController.deleteBook)




module.exports = router 