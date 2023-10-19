const { readFile, writeFile } = require('fs/promises')
const { nanoid } = require('nanoid')

const path = require('path')

const booksPath = path.join(__dirname + '/books.json')

const saveBooks = async (books) => await writeFile(booksPath, JSON.stringify(books, null, 2))

const getAllBooks = async () => {
    let books = await readFile(booksPath, 'utf-8');
    books = JSON.parse(books)

    return books;
}

const getById = async (bookId) => {
    const books = await getAllBooks()

    // const resultBook = books.find(({ id }) => id === bookId)
    const resultBook = books.find((book) => book.id === bookId)

    return resultBook || null;
}

const updateById = async (bookId, { title, author }) => {
    const books = await getAllBooks()
    const bookIndex = books.findIndex((book) => book.id == bookId)

    if (bookIndex === -1) {
        return null
    }

    books[bookIndex] = { id: bookId, title, author }

    await saveBooks(books)

    return books[bookIndex];
}

const createBook = async ({ title, author }) => {
    const books = await getAllBooks()
    const newBook = { id: nanoid(), title, author }

    books.push(newBook);

    await saveBooks(books)

    return newBook;
}

const deleteBook = async (bookId) => {
    const books = await getAllBooks()

    const bookIndex = books.findIndex(({ id }) => id === bookId)

    if (bookIndex === -1) {
        return null
    }

    const [deletedBook] = books.splice(bookIndex, 1)

    await saveBooks(books)

    return deletedBook
}

module.exports = {
    getAllBooks,
    getById,
    updateById,
    createBook,
    deleteBook,
}