const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
var cors = require('cors')

const port = 3000

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

io.on('connection', socket => {
    console.log('User connected')

    socket.on('dosomething', () => {
        console.log('doing something')
        socket.emit('sayhello', 'hello from the server')
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(3000, function (err) {
    if (err) throw err
    console.log('listening on port 3000')
})