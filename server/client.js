import io from 'socket.io-client';
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('message', (data) => {
  console.log('Received message:', data);
});

socket.on('messages', (data) => {
  console.log(data);
});

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
