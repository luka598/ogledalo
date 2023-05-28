import React, { useState, useEffect } from 'react';
import Message from './message';
import classNames from 'classnames'

// eslint-disable-next-line import/no-anonymous-default-export
export default function() {
  const createMessage = (id, offset, username, text) => {return {id: id, offset: offset, username: username, text: text}};
  const [messages, setMessages] = useState([createMessage(0, -1, "", "")])


  const addMessage = (username, text) => {
    console.log(username, text)
    const len = (arr) => arr.length
    const last = (arr) => arr.length-1

    let m = [...messages]
    m.push(createMessage(Math.floor(Math.random()*1000000), -1, "", ""))
    if (len(m) > 10) {m.shift()}
    m[len(m) - 2].username = username
    m[len(m) - 2].text = text
    for (let i=0; i<last(m); i++) { m[i].offset++ }
    setMessages(m)
  }
 
  return (
    <div>
      <button className="bg-blue-500 m-1 p-1 rounded shadow text-white w-60" onClick={() => { addMessage(`User${Math.floor(Math.random()*100)}`, (Math.random()+1).toString(36).substring(7)) }}>Add</button>
      <div className="relative">{
        messages.map((m, index) => (
          <div key={m.id} className={classNames(
            "absolute top-0 left-0 transition-all duration-1000",
            {
              "blur opacity-0 scale-0": m.offset == -1,
              "blur-0 opacity-100": m.offset == 0,
              "translate-y-[4.3rem]": m.offset == 1,
              "translate-y-[8.6rem]": m.offset == 2,
              "translate-y-[12.9rem] blur opacity-0": m.offset >= 3,
            }
          )}>
            <Message username={m.username} text={m.text}/>
          </div>
        ))
        }</div>
    </div>
  );
}
