const { Server } = require('socket.io')
const { createServer } = require('http')

const httpServer = createServer()

const webSocketServer = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

webSocketServer.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('user-message', (data) => {
        socket.broadcast.emit('user-message', data)
    })
})

httpServer.listen(4020)