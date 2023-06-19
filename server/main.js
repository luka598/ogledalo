import { Server } from "socket.io";
import cron from "node-cron";
import { v4 as uuidv4 } from 'uuid';
import weather from "./weather.js";
import Jimp from "jimp"

const io = new Server({
  cors: {
    origin: "*"
  }
});

let cache = {
  weather: {},
  radar: {},
  messages: [],
  webcam: {}
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

  socket.on('webcam', (data) => {
    if (!data) {return}
    let imgb = Buffer.from(data.split(',')[1], 'base64')
    if (cache.webcam.last){
      Jimp.read(imgb).then(
        img1 => Jimp.read(cache.webcam.last).then(
          img2 => {
            const diff = Jimp.compareHashes(img1.pHash(), img2.pHash())
            if (diff >= 0.25) { socket.emit('movement', true); console.log("Movement") }
            cache.webcam.last = imgb
          }
        ).catch((e) => console.log("Error while loading image2", e))
      ).catch((e) => console.log("Error while loading image1", e))
    } else {
      cache.webcam.last = imgb
    }
  })

  socket.on('disconnect', () => {
  });
});

io.listen(3000);
console.log("Started!")

weather().then((data)=>{
  cache.weather = data
})

cron.schedule("0 * * * *", ()=>{
  weather().then((data)=>{
    cache.weather = data
    io.emit('weather', data)
  })
})
