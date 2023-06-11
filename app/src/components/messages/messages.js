import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import classNames from 'classnames'
import { socket } from "src/socket.js";

export default function() {
  const [messages, setMessages] = useState([])
  // {uuid: "", position: 0, time: new Date(), username: "", text: "", image: undefined}


  const addMessage = (message) => {
    setMessages((old)=>{
      message.position = 0
      return [...old, message]
    })
  }

  useEffect(()=>{
    socket.on('message', (data) => {
      console.log(data)
      addMessage(data)
    })

    return ()=>{
      socket.off('message')
    }
  }, [])


  useEffect(()=>{
    const interval = setInterval(()=>{
      setMessages((old) => {
        let m = [...old]
        for (let i=0; i<m.length; i++){
          if (m[i].position == 0){
            for (let j=0; j <= i; j++){
              console.log("Old position", j, m[i].position)
              m[j].position++
              console.log("New position", j, m[i].position)
            }
            break
          }
        }
        console.log(m)
        return m
      })
    }, 10000)
    return ()=>clearInterval(interval);
  }, [])

  // useEffect(()=>{
  //   console.log(messages)
  // }, [messages])

  return (
    <div>
    <div className="relative">{
      messages.map((m, index) => (
        <div key={m.uuid} className={classNames(
          "absolute top-0 left-0 transition-all duration-1000",
          {
            "opacity-0 blur scale-0": m.position == 0,
            "opacity-100 blur-0": m.position == 1,
            "translate-y-[4.3rem]": m.position == 2,
            "translate-y-[8.6rem]": m.position == 3,
            "translate-y-[12.9rem] opacity-0 blur-xl scale-50": m.position >= 4,
          }
        )}
        >
        <Message username={m.username} time={m.time} text={m.text + (index)}/>
        </div>
      ))
    }</div>
    </div>
  );
}
