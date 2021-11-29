import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatMessage from './ChatMessage/ChatMessage';
import { io } from "socket.io-client";
import './styles/chat.box.scss';
import { EditMsg, MsgToEdit } from '../../../chatSlice';
const ChatBox = () => {
  const messages=useSelector((state)=>state.message.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    // message-updated
    const socket = io('ws://localhost:5000');
    socket.on('message-updated', (message) => {
      console.log('message updated');
      dispatch(EditMsg(message));
      dispatch(MsgToEdit(null));
    })
    return () => {
      
    }
  }, [dispatch])
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
