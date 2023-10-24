const express = require('express')

const app = express()

const books = require('./books')

app.get('/books', (req, res) => {
    // res.json(null)
    res.json(books);
})

app.listen(3000, () => console.log('Server is running'))