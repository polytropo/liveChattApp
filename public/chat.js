// Make connection
const socket = io.connect('http://localhost:4000');

// Query dom
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', () => {
  // Send socket to server
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
  message.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
  });
// listen for events
socket.on('chat', data => {
  feedback.innerHTML = '';
  // Now we cna output what we got from server to our lcient dom
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`;
});
