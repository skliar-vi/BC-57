const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1>')
})

app.get('/books', (req, res) => {
    console.log(req.url);
    console.log(req.headers)
    console.log(req.method)

    res.send('<b>Books page</b>')
})

app.listen(3000, () => console.log('Server is running'))