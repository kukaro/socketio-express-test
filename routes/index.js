var express = require('express');
var router = express.Router();
const app = express();
const http = require('http');
const socketIO = require('socket.io')

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }

});

server.listen(3100, () => {
    console.log('listening on :3100');
});


io.on('connection', function (socket) {
    var instanceId = socket.id;
    socket.on('msg', function (data) {
        console.log(data);
        socket.emit('recMsg', {comment: instanceId + ":" + data.comment + '\n'});
    })
    socket.on('join', (data) => {
        console.log(data);
        socket.join(data.room);
        io.to(data.room).emit('recMsg', {comment: instanceId + ":" + data.comment + '\n'});
    })
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
