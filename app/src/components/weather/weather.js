import React, {useState, useEffect} from "react"
import Lottie from "lottie-react"
import classNames from "classnames"

import StormA from "./storm.json"

export default function(props) {
  return (
    <div className={classNames("text-white h-24 w-24 p-5 rounded", props.className)}>
      <Lottie animationData={StormA}/>
      <p className="animate-bounce">Kiša?!?</p>
    </div>
  )
}
