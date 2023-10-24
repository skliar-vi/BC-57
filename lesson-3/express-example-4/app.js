const app = require('express')()
const cors = require('cors')
const booksRouter = require('./routes/api/v1/books')

app.use(cors())

app.use('/api/v1/books', booksRouter)

app.use((req, res) => {
    res.json({
        message: 'Page not found'
    })
})

app.listen(3000, () => console.log('Server is running'))