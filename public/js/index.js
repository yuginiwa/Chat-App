var socket = io();

socket.on('connect', function ()  {
  console.log('connected');

  socket.emit('createEmail', {
    to: "etc@example.com",
    text: "Sending example email"
  });

  socket.emit('createMessage', {
    to: "etc@example.com",
    text: "Sending example message"
  });
});

socket.on('disconnect', function ()  {
  console.log('disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
