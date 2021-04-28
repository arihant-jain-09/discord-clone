import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import './ChatEdit.scss'
import setclicked from '../../redux/clicked/clicked.actions';
import useKeypress from '../Keypress/Keypress';

function ChatEdit() {
    const id=useSelector((state)=>state.msg.id);
    const currentid=useSelector((state)=>state.doc.id);
    const msg=useSelector((state)=>state.msg.msg);
    const [formValue,setformValue]=useState(msg);
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const  dispatch = useDispatch();
    const handleSubmit=(e)=>{
        console.log('called');
        e.preventDefault();
        const docRef=firestore.collection('servers').doc(currentserverid).collection('channels').doc(currentid).collection('messages').doc(id);
        console.log(docRef);
        docRef.update({
            message:formValue
        })
        dispatch(setclicked())
    }
    useKeypress('Escape', () => {
        dispatch(setclicked())
      });
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="chatedit">
                    <input type='text' required value={formValue} onChange={(e)=>{setformValue(e.target.value)}} style={{width:'100%'}} className='chatedit__inputarea'/>
                </div>
                <div className="editinstruction">
                    <p className='editinstruction__p'>escape to <span className='editinstruction__span' onClick={()=>dispatch(setclicked())}>cancel</span> • enter to <span className='editinstruction__span' onClick={handleSubmit}>save</span></p>
                </div>
            </form>
        </>
    )
}

export default ChatEdit
