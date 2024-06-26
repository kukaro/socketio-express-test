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
    const instanceId = socket.id;
    socket.on('msg', function (data) {
        console.log('#ON MSG');
        console.log(data);
        socket.emit('recMsg', {comment: instanceId + ":" + data.comment + '\n'});
    })
    socket.on('join', (data) => {
        console.log('#ON JOIN');
        console.log(data);
        socket.join(data.roomName);
        io.to(data.roomName).emit('recMsg', {comment: instanceId + ":" + data.roomName + '\n'});
    })
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
