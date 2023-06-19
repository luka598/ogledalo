import React, {useEffect, useRef} from "react"
import Webcam from "react-webcam"
import { socket } from "src/socket.js";

export default function(props) {
  const webcamRef = useRef(null)

  useEffect(()=>{
    const captureAndsendImage = () => {
      const img = webcamRef.current.getScreenshot({height: 50, width: 50});
      socket.emit('webcam', img)
    }
    const interval = setInterval(captureAndsendImage, 500)
    return () => {
      clearInterval(interval)
    }
  }, [webcamRef])

  const videoConstraints = {
    width: 1,
    height: 1,
    facingMode: "user"
  };

  return (
    <div className={props.className}>
      <Webcam className="hidden" ref={webcamRef} audio={false} videoConstraints={videoConstraints} screenshotFormat="image/png"/>
    </div>
  )
}
