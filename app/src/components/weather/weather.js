import React, {useState, useEffect} from "react"
import Lottie from "lottie-react"
import classNames from "classnames"
// <Lottie animationData={StormA}/>
export default function(props) {
  return (
    <div className={classNames("text-white h-24 w-24 p-5 rounded", props.className)}>
      <p className="animate-bounce">Kiša?!?</p>
    </div>
  )
}
