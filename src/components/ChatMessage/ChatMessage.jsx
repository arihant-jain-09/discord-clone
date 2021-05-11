// import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {firestore } from '../../firebase/firebase';
import FetchRoleid from '../RolesDocument/FetchRoleid';
// import {db} from '../../firebase/firebase'
import './ChatMessage.scss'
import Chatmessagemap from './Chatmessagemap';
const ChatMessage= ()=> {
    const id= useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels').doc(id).collection('messages');
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

    const currrentdoc=useSelector((state)=>state.doc.name);
    return (
        <div >
            {currrentdoc==='roles'?<FetchRoleid/>: messages && messages.map((msg)=>{
                return <Chatmessagemap key={msg.id} msg={msg}/>
            })}            
        </div>
    )
}

export default ChatMessage
