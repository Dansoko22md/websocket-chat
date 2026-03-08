// Basic Express + Socket.io server for chat
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

let onlineUsers = {};

io.on('connection', (socket) => {
  let username = '';

  socket.on('join', (user) => {
    username = user;
    onlineUsers[socket.id] = username;
    io.emit('onlineUsers', Object.values(onlineUsers));
    socket.broadcast.emit('userJoined', username);
  });

  socket.on('message', (msg) => {
    io.emit('message', { user: username, text: msg });
  });

  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('typing', { user: username, isTyping });
  });

  socket.on('disconnect', () => {
    if (username) {
      socket.broadcast.emit('userLeft', username);
      delete onlineUsers[socket.id];
      io.emit('onlineUsers', Object.values(onlineUsers));
    }
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket Chat Server Running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
