import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { db, firestore } from '../../firebase/firebase';
import './ChatMessage.scss'
import Chatmessagemap from './Chatmessagemap';
const ChatMessage= ()=> {
     const id= useSelector((state)=>state.doc.id)
    const channelRef= firestore.collection('channels').doc(id).collection('messages');
    const query=channelRef.orderBy('createdAt');
    const [messages]=useCollectionData(query,{idField:'id'});
    // const currentkey=useSelector((state)=>state.key.key);
    // useEffect(() => {
    //     const uploadRef= db.ref(`uploads/${currentkey}`);
    //     uploadRef.on("value",(snapshot)=>{
           
    //         console.log('called useEffect');
    //     })
    //     return () => {
    //         uploadRef.off();
    //         console.log('called clean');
            
    //     }
    // }, [currentkey])
    return (
        <div >
            {messages && messages.map((msg)=>{
                return <Chatmessagemap key={msg.id} msg={msg}/>
            })}
        </div>
    )
}

export default ChatMessage
