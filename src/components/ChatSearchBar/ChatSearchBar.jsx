import React, { useState } from 'react'
import './ChatSearchBar.scss'
import firebase from 'firebase/app'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { IconButton,makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/firebase';
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            color: '#b8bbc0',
            padding:'1.25rem .75rem'
        },
        addbutton:{
            backgroundColor:'#40454b',
            color:'#b8bbc0',
            padding:'.9rem 1rem',
            '&:hover':{
                backgroundColor:'#40454b'
            }
        }
    }
})
function ChatSearchBar() {
    const classes=useStyles();
    const [formValue,setformValue]=useState('');
    const id= useSelector((state)=>state.doc.id)
    const channelRef= firestore.collection('channels').doc(id).collection('messages');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await channelRef.add({
            message:formValue,
            sendername:auth.currentUser.displayName,
            senderemail:auth.currentUser.email,
            senderuid:auth.currentUser.uid,
            senderphoto:auth.currentUser.photoURL,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setformValue('');
    }
    return (
        <div>
            <div className="chatsearchbar">
                <div className="chatsearchbar__addicon">
                    <IconButton className={classes.addbutton} aria-label="settings">
                        <AddCircleOutlineIcon fontSize='large'/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__input">
                    <form onSubmit={handleSubmit}>
                     <input value={formValue} required onChange={(e)=>{setformValue(e.target.value)}} className='chatsearchbar__input-text' placeholder='Message #code-runner' type="text"/>
                    </form>
                </div>
                <div className="chatsearchbar__gifticon">
                    <IconButton className={classes.button} aria-label="settings">
                        <CardGiftcardIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__gifcon">
                    <IconButton className={classes.button} aria-label="settings">
                        <GifIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__emojiicon">
                    <IconButton className={classes.button} aria-label="settings">
                        <InsertEmoticonIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ChatSearchBar
