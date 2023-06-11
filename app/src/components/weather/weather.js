import React, {useState, useEffect} from "react"
import Lottie from "lottie-react"
import classNames from "classnames"
import Clear from "./icons/fill/all/clear-day.svg"
import Cloudy from "./icons/fill/all/cloudy.svg"
import Rain from "./icons/fill/all/rain.svg"
import Fog from "./icons/fill/all/fog.svg"
// <Lottie animationData={StormA}/>
export default function(props) {
  return (
    <div className={classNames("text-white h-24 w-24 p-5 rounded", props.className)}>
      <img src={Clear} />
      <div className="grid grid-cols-7 grid-rows-1 scale-150">
        <img src={Clear} />
        <img src={Clear} />
        <img src={Cloudy} />
        <img src={Rain} />
        <img src={Cloudy} />
        <img src={Rain} />
        <img src={Fog} />
      </div>
    </div>
  )
}
