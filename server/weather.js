import axios from "axios";

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=45.41&longitude=13.66&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,sunrise,sunset&timezone=auto"

export default function (callback) {
  axios.get(apiUrl)
}
