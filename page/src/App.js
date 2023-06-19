import { useState, useEffect } from "react"
import classNames from "classnames"
import { socket } from "src/socket.js";

import Messages from "./components/messages/messages.js"
import Clock from "./components/clock.js"
import Weather from "./components/weather/weather.js"
import Webcam from './components/Webcam.js'

function App() {
  const [awakeTimeout, setAwakeTimeout] = useState(0)

  useEffect(()=>{
    const updateTimeout = () => {
      setAwakeTimeout((old) => Math.max(0, old-1))
    }
    const interval = setInterval(updateTimeout, 1 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
      socket.on('movement', () => {
        setAwakeTimeout((old) => Math.min(old+10, 30))
      })

      return () => {
        socket.off('movement')
      }
    }, [])

  const awake = () => {
    return awakeTimeout > 0
  }

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      <Webcam className="absolute right-3 top-3" />
      <div className="bg-zinc-700 text-white shadow shadow-zinc-600 rounded m-1 p-1 absolute right-0 opacity-5">xxx.xxx.xxx.xxx http(6969) socketIO(3000) ({awakeTimeout})</div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 left-1/2 -translate-x-1/2",
        {
          "top-1/2 -translate-y-1/2 scale-[2] opacity-10": !awake(),
          "top-[15%] -translate-y-1/2 scale-[1.25]": awake(),
        }
      )}>
        <Clock />
      </div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 left-1/2 -translate-x-1/2",
        {
          "top-full": !awake(),
          "top-1/2 -translate-y-1/2 scale-[3]": awake(),
        }
      )}>
        <Weather />
      </div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 top-1/2 -translate-y-1/2",
        {
          "left-full": !awake(),
          "left-[85%] -translate-x-1/2 scale-[1]": awake(),
        }
      )}>
        <Messages />
      </div>

    </div>

  );
}

export default App;
