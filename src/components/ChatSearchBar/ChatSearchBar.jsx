import React, { useState} from 'react'
import './ChatSearchBar.scss'
import firebase from 'firebase/app'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { IconButton,makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/firebase';
import FileUpload from '../FileUpload/FileUpload'
import openupload from '../../redux/openupload/message.actions'
import Emojicontainer from '../Emoji/Emojicontainer'
import replytoggle from '../../redux/replytoggle/replytoggle.actions'
import ChatSearchReply from './ChatSearchReply'
import { useCollectionData } from 'react-firebase-hooks/firestore';
const useStyles=makeStyles(()=>{
    return{
        button:{
            color: '#b8bbc0',
            padding:'0 .75rem'
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
    const dispatch = useDispatch()
    const classes=useStyles();
    const [openpicker,setopenpicker]=useState(false);
    const [formValue,setformValue]=useState('');
    const currentserverid=useSelector((state)=>state.currentserver.id)
    const id= useSelector((state)=>state.doc.id)
    const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels').doc(id).collection('messages');
    const replymsg= useSelector((state)=>state.reply);
    const togglereply=useSelector((state)=>state.replytoggle.clicked);
    const currentdoc=useSelector((state)=>state.doc.name);
    const query=channelRef.orderBy('createdAt','desc').limit(1);
    const [messages]=useCollectionData(query,{idField:'id'});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(currentdoc==='roles'){
            setformValue('Not authorized to send message here');
            return
        }
        if(!togglereply){
            if(!!messages.length && messages[0].senderemail===auth.currentUser.email){
                const messageRef=channelRef.doc(messages[0].id);
                await messageRef.update({
                    message:messages[0].message+'\\n'+formValue
                },{merge:true})
            }
            else{
                await channelRef.add({
                    message:formValue,
                    sendername:auth.currentUser.displayName,
                    senderemail:auth.currentUser.email,
                    senderuid:auth.currentUser.uid,
                    senderphoto:auth.currentUser.photoURL,
                    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
            
        }
        else{
            await channelRef.add({
                message:formValue,
                sendername:auth.currentUser.displayName,
                senderemail:auth.currentUser.email,
                senderuid:auth.currentUser.uid,
                senderphoto:auth.currentUser.photoURL,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                reply:replymsg
            })
            dispatch(replytoggle());
        }
        setformValue('');
    }
    const handlePicker=()=>{
        setopenpicker(!openpicker)
    }
    const handleadd=()=>{
        dispatch(openupload());
    }
    
    return (
        <div style={{position:'relative'}}>
           {useSelector((state)=>state.replytoggle.clicked)&&<ChatSearchReply/>}
            <div className="chatsearchbar">
                <div className="chatsearchbar__addicon">
                    <IconButton className={classes.addbutton} onClick={handleadd} aria-label="settings">
                        <AddCircleOutlineIcon fontSize='large' />
                    </IconButton>
                </div>
                <div className="chatsearchbar__input">
                    <form onSubmit={handleSubmit}>
                     <input autoFocus id="myTextField" value={formValue} required onChange={(e)=>{setformValue(e.target.value)}} className='chatsearchbar__input-text' placeholder={`Message #${useSelector((state)=>state.doc.name)}`} type="text"/>
                    </form>
                </div>
                <div className="chatsearchbar__gifticon">
                    <IconButton className={classes.button} aria-label="settings" >
                        <CardGiftcardIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__gifcon">
                    <IconButton className={classes.button} aria-label="settings">
                        <GifIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                
                <div className="chatsearchbar__emojiicon">
                    <IconButton className={classes.button} onClick={handlePicker} aria-label="settings">
                        <InsertEmoticonIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
            </div>
         {openpicker&& <div className='emojipicker'><Emojicontainer/></div>}
        {useSelector((state)=>state.open.open) && <div className='upload'><FileUpload/></div>}
        </div>
    )
}

export default ChatSearchBar
