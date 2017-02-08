const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: "sample@example.com",
    text: "sample email",
    createdAt: 1234
  });

  socket.emit('newMessage', {
    from: "sample@example.com",
    text: "sample chat",
    createdAt: 1234
  });

  socket.on('createEmail', (newEmail) => {
    console.log('newEmail', newEmail);
  });

  socket.on('createMessage', (newMessage) => {
    console.log('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
