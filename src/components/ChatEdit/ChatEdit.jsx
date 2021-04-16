import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import TextareaAutosize from 'react-textarea-autosize';
import './ChatEdit.scss'
import SaveIcon from '@material-ui/icons/Save';
import { IconButton, makeStyles } from '@material-ui/core';
import setclicked from '../../redux/clicked/clicked.actions';

const useStyles=makeStyles(()=>{
    return{
        icon:{
            color:'#dadbdc',
            '&:hover':{
                backgroundColor:'#3a3e44'
            }
        }
    }
})
function ChatEdit() {
    const classes=useStyles();
    const id=useSelector((state)=>state.msg.id);
    const currentid=useSelector((state)=>state.doc.id);
    const msg=useSelector((state)=>state.msg.msg);
    const [formValue,setformValue]=useState(msg);
    const  dispatch = useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const docRef=firestore.collection('channels').doc(currentid).collection('messages').doc(id);
        console.log(docRef);
        docRef.update({
            message:formValue
        })
        dispatch(setclicked())
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextareaAutosize spellcheck="false" required value={formValue} onChange={(e)=>{setformValue(e.target.value)}} style={{width:'100%'}} className="textarea"/>
                    <IconButton type='submit' className={classes.icon}>
                        <SaveIcon/>
                    </IconButton>
            </form>
        </div>
    )
}

export default ChatEdit
