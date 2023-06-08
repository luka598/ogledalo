import io from 'socket.io-client';
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

// Connect to the Socket.io server
const socket = io('http://localhost:3000');

// Socket.io connect event
socket.on('connect', () => {
  console.log('Connected to server');

  // Send a message to the server
  socket.emit('message', 'Hello from Node.js!');
});

// Socket.io message event
socket.on('message', (data) => {
  console.log('Received message:', data);
});

// Socket.io disconnect event
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const repl = () => {
  rl.question('>> ', (input) => {
    repl()
    socket.emit('message', input)
  });
}
repl()
