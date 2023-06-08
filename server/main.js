import { Server } from "socket.io";
import cron from "node-cron";
import weather from "./weather.js";

const io = new Server()

let cache = {
  weather: {},
  radar: {},
}

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Socket.io message event
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast the message to all connected clients
    socket.emit('message', socket.conn.remoteAddress);
  });

  // Socket.io disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
io.listen(port);
console.log(`Server listening on port ${port}`);

weather()

cron.schedule("0 * * * *", ()=>{

})
