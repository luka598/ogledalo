import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import classNames from 'classnames'
import { socket } from "src/socket.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default function() {
  const [messages, setMessages] = useState([{uuid: "", time: new Date(), username: "", text: "", image: undefined}])


  const addMessage = (message) => {
    // Message = {uuid, time, username, text, image?}

    setMessages((old)=>{
      let m = [message, ...old]
      if (m.lenght >= 4){m.pop(4)}
      return m
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
    console.log(messages)
  }, [messages])

// {
//             "blur opacity-0 scale-0": m.offset == -1,
//             "blur-0 opacity-100": m.offset == 0,
//             "translate-y-[4.3rem]": m.offset == 1,
//             "translate-y-[8.6rem]": m.offset == 2,
//             "translate-y-[12.9rem] blur opacity-0": m.offset >= 3,
//           }

  return (
    <div>
    <div className="relative">{
      messages.map((m, index) => (
        <div key={m.uuid} className={classNames(
          "absolute top-0 left-0 transition-all duration-1000",
          {
            "opacity-0 blur scale-0": index == 0,
            "opacity-100 blur-0": index == 1,
            "translate-y-[4.3rem]": index == 2,
            "translate-y-[8.6rem]": index == 3,
            "translate-y-[12.9rem] opacity-0 blur-xl scale-50": index >= 4,
          }
        )}
        >
        <Message username={m.username} text={m.text + (index)}/>
        </div>
      ))
    }</div>
    </div>
  );
}
