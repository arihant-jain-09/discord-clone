import React from 'react'
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage/ChatMessage';
import './styles/chat.box.scss';
const ChatBox = () => {
  const messages=useSelector((state)=>state.message.messages);
  return (
    <>
     <div className="chatBox">
      {messages?.map((message)=>{
        return <ChatMessage key={message._id} message={message}/>
      })}
     </div> 
    </>
  )
}

export default ChatBox
