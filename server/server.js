const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const CreatureBuilder = require('./builders/CreatureBuilder')

const port = 4000

//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

io.on('connection', socket => {
    console.log('User connected')

    socket.emit('newcreature', CreatureBuilder.randomCreature());
    socket.emit('newcreature', CreatureBuilder.randomCreature());
    socket.emit('newcreature', CreatureBuilder.randomCreature());

    socket.on('dosomething', () => {
        console.log('doing something')
        socket.emit('sayhello', 'hello from the server')
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, function (err) {
    if (err) throw err
    console.log('listening on port ' + port)
})