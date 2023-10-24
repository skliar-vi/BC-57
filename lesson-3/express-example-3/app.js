const express = require('express')
const { format } = require('date-fns')
const { appendFile } = require('fs/promises')
const cors = require('cors')

const app = express()

// const corsMiddleware = cors()
// app.use(corsMiddleware)
app.use(cors())

const books = require('./books')

// app.use((req, res, next) => {
//     console.log('I am first middleware')

//     next()
// })

// app.use((req, res, next) => {
//     console.log('I am second middleware')

//     next()
// })

app.use(async (req, res, next) => {
    const { method, url } = req

    const date = format(new Date(), 'dd-MM-yyyy_HH:mm:ss')

    await appendFile('./public/server.log', `\n${method} ${url} ${date}`)

    next()
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/contacts', (req, res) => {
    res.json([])
})

app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found'
    })
})

app.listen(3000, () => console.log('Server is running'))