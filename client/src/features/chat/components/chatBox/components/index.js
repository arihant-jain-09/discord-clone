import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import { io } from "socket.io-client";
import './styles/chat.box.scss';
import { PinMsg, DeleteMsg, EditMsg, MsgToEdit } from '../../../chatSlice';
import ChatLoader from './ChatLoader/ChatLoader';
const ChatBox = () => {
  const messages=useSelector((state)=>state.message.messages);
  const messageFetchLoading=useSelector((state)=>state.message.messageFetchLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    // message-updated
    const socket = io('ws://localhost:5000');
    socket.on('message-updated', (message) => {
      console.log('message updated');
      dispatch(EditMsg(message));
      dispatch(MsgToEdit(null));
    })
    //message-deleted
    socket.on('message-deleted', (msgId) => {
      console.log('message deleted');
      dispatch(DeleteMsg(msgId));
    })
    // message-pinned
    socket.on('message-pinned', (msgId) => {
      console.log('message pinned');
      dispatch(PinMsg(msgId));
    })
    return () => {
      
    }
  }, [dispatch])

  return (
    <>
    <div className="chatBox">
    {messageFetchLoading ? <ChatLoader/>: messages?.map((message,i)=>{
        return <ChatMessage key={message._id} message={message}/>
      })
     }
     </div> 
    </>
  )
}

export default ChatBox
