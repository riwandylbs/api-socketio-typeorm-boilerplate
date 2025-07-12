import { SOCKET_AUTH_TOKEN, SOCKET_PORT } from "../config";

const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {
    origins: [
      '*'
    ],
    handlePreflightRequest: (req,res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Credentials": true
      });
      res.end()
    } 
  }
});

io.use(async(socket, next) => {
    if (!socket.handshake.auth.token) {
        next(new Error('Please send your token'))
    }

    if (socket.handshake.auth.token != SOCKET_AUTH_TOKEN) {
        next(new Error('Unauthorized connection'))
    } else {
        next()
    }
    
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
});

module.exports.io = io;

server.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO server is running on port ${SOCKET_PORT}`);
});