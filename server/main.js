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
  io.emit('weather', cache.weather)

  socket.on('message', (data) => {
    //validate(data)
    if (data.text == ".weather") {io.emit('weather', cache.weather)}
    io.emit('message', {uuid: uuidv4(), username: data.username, time: new Date(), text: data.text, image: undefined});
  });

  socket.on('disconnect', () => {
  });
});

io.listen(3000);
console.log("Started!")

weather().then((data)=>{
  cache.weather = data
  console.log(data)
})

cron.schedule("0 * * * *", ()=>{
  weather().then((data)=>{
    cache.weather = data
    io.emit('weather', data)
  })
})
