const http = require('http')

// request - вхідні дані запиту
// response - вихідні дані

const server = http.createServer((request, response) => {
    const { url } = request

    if (url === '/') {
        response.write('<h1>Welcome!</h1>')
    } else if (url === '/books') {
        response.write('<b>Here u can see the list of books</b>')
    } else {
        response.write('<h1>Page not found!</h1>')
    }

    response.end()
})

server.listen(3000, () => console.log('Server is running on 3000 port'));