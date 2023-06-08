import axios from "axios";

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=45.41&longitude=13.66&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,sunrise,sunset&timezone=auto"

let wwGroup = {
  0: 0,
  
  1: 1,
  2: 1,
  3: 1,

  45: 2,
  48: 2,

  51: 3,
  53: 3,
  55: 3,

  56: 4,
  57: 4

}

let wwName = {
  0: "clear-sky",
  1: "mainly-clear",
  2: "partily-cloudy",
  3: "overcast",
}


export default function (callback) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then((resp) =>{
      resolve(resp.data)
    })
  })
}
