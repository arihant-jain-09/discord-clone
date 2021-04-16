import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import './ChatMessage.scss'
import Chatmessagemap from './Chatmessagemap';
const ChatMessage= ()=> {
     const id= useSelector((state)=>state.doc.id)
    const channelRef= firestore.collection('channels').doc(id).collection('messages');
    const query=channelRef.orderBy('createdAt');
    const [messages]=useCollectionData(query,{idField:'id'});
    console.log(messages);
    
    return (
        <div>
            {messages && messages.map((msg)=>{
                return <Chatmessagemap key={msg.id} msg={msg}/>
            })}
        </div>
    )
}

export default ChatMessage
