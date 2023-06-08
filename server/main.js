import { Server } from "socket.io";
import cron from "node-cron";
import { v4 as uuidv4 } from 'uuid';
import weather from "./weather.js";

const io = new Server({
  cors: {
    origin: "http://localhost:6969"
  }
});

let cache = {
  weather: {},
  radar: {},
  messages: [],
}

// Socket.io connection event
io.on('connection', (socket) => {
  console.log("Client connected!")
  socket.on('message', (data) => {
    //validate(data)
    io.emit('message', {uuid: uuidv4(), username: "TODO", time: new Date(), text: data, image: undefined});
  });

  socket.on('disconnect', () => {
  });
});

io.listen(3000);
console.log("Started!")
// weather().then((data)=>{
//   console.log(data)
// })
//
// cron.schedule("0 * * * *", ()=>{
//
// })
