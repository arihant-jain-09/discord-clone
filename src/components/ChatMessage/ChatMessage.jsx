import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';

const ChatMessage= ()=> {
     const id= useSelector((state)=>state.doc.id)
    const channelRef= firestore.collection('channels').doc(id).collection('messages');
    // const query=channelRef.orderBy('createdAt').limit(10);
    const [messages]=useCollectionData(channelRef,{idField:'id'});
    console.log(messages);
    return (
        <div>
            
        </div>
    )
}

export default ChatMessage
