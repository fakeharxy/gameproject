const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')

const CreatureBuilder = require('./builders/CreatureBuilder')
const Game = require('./objects/Game')

const port = 4000

//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)


// TODO: move this somewhere more sensible
const game = new Game();

io.on('connection', socket => {
    console.log('User connected');

    socket.on('mate', (id1, id2) => {
        console.log('doing something to creatures ' + id1 + ' and ' + id2);
        socket.emit('newcreature', game.breedCreatures(id1, id2));
    });

    socket.on('getRandom', () => {
        socket.emit('newcreature', game.createRandomCreature());
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
})

server.listen(port, function (err) {
    if (err) throw err
    console.log('listening on port ' + port)
})