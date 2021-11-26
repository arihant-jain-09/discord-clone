import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './styles/message.box.scss';
import { getDocs,getFirestore,collection,query,orderBy } from "firebase/firestore";
const MessageBox = () => {
  const currentServer = useSelector(state => state.server.currentServer);
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const [messages,setMessages]=useState([]);
  useEffect(() => {
    const db=getFirestore();
    const fetchMessages=async()=>{
      const listMessages=[];
      const queryRef = query(collection(db, "servers", currentServer.id, "channels",currentChannel.id,"messages"),orderBy("createdAt", "asc"));
      const messageRef = await getDocs(queryRef);
      messageRef.forEach((message)=>{
        listMessages.push({...message.data(),id:message.id});
      })
      setMessages(listMessages);
    }

    if(currentServer && currentServer.id){
      fetchMessages();
    }
    return () => {
      
    }
  }, [currentServer,currentChannel])
  return (
    <>
     <div className="messageBox">
      
     </div> 
    </>
  )
}

export default MessageBox
