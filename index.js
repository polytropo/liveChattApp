const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(4000, () => console.log('listening on port 4000!'));

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  // Listen for socket being send to the server from client
  // Handle chat event
  socket.on('chat', data => {
    // After server receives this data we want to send it out so clients can see it
    io.sockets.emit('chat', data);
  });
  // This one below we want to broadcast to every other client than the one socket came from
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
