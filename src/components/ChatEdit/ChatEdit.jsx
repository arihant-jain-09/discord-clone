import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';

function ChatEdit() {
    const id=useSelector((state)=>state.msg.id);
    const currentid=useSelector((state)=>state.doc.id);
    const msg=useSelector((state)=>state.msg.msg);
    const [formValue,setformValue]=useState(msg);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const docRef=firestore.collection('channels').doc(currentid).collection('messages').doc(id);
        console.log(docRef);
        docRef.update({
            message:formValue
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea defaultValue={msg} value={formValue}onChange={(e)=>{setformValue(e.target.value)}}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ChatEdit
