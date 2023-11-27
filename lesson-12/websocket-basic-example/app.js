import { WebSocketServer } from 'ws'

const wsServer = new WebSocketServer({ port: 4020 })

const clients = []

wsServer.on('connection', (socket) => {
    console.log("We have new client connected");

    clients.push(socket)

    setTimeout(() => socket.send("Welcome to web sockets"), 3000)

    clients.forEach(client => {
        if (client != socket) {
            client.send(`New client connected, clients count is ${clients.length}`)
        }
    })

    socket.on('close', () => {
        const index = clients.findIndex(client => client === socket)

        clients.splice(index, 1)

        clients.forEach(client => {
            client.send(`One of client has been disconected.Now we have ${clients.length} clients`)
        })
    })

})