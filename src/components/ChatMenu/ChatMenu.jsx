import React, { useEffect,useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Dialog, IconButton, makeStyles } from '@material-ui/core';
import { auth, firestore } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import currentmessage from '../../redux/message/message.actions'
import setclicked from '../../redux/clicked/clicked.actions'
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import replymessage from '../../redux/replyclicked/replyclicked.actions'
import replytoggle from '../../redux/replytoggle/replytoggle.actions'
import './ChatMenu.scss'
import Emojicontainer from '../Emoji/Emojicontainer';
const useStyles=makeStyles(()=>{
    return{
        chatmenu:{
            display:'flex'
        },
        icon:{
            color:'#dadbdc',
            '&:hover':{
                backgroundColor:'#3a3e44'
            }
        },
        myicon:{
          color:'#b9bbbe',
          width:'1.8rem',
          height:'1.8rem'
        },
        deleteicon:{
          width:'1.8rem',
          height:'1.8rem',
          color:'#f04747'
        }
    }
})

function ChatMenu({msg}) {
    const classes=useStyles();
    const dispatch = useDispatch();
    const currentid=useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const [other,setother]=useState(false);
    const [user,setuser]=useState(false);
    const [emoji,setemoji]=useState(false);
    const handleClick = () => {
        dispatch(currentmessage({id:msg.id, msg:msg.message}))
        dispatch(setclicked());
  };
  const handleDelete=()=>{
    const docRef=firestore.collection('servers').doc(currentserverid).collection('channels').doc(currentid).collection('messages').doc(msg.id);
    docRef.delete();
  }
  const handleReply=()=>{
    document.getElementById("myTextField").focus();
    dispatch(replymessage({id:msg.id,sender:msg.sendername,msg:msg.message,photo:msg.senderphoto}));
    dispatch(replytoggle())
  }
  const handleemoji=()=>{
    setemoji(!emoji);
  }
  const handlemore=()=>{
    console.log('called');
    if(auth.currentUser.email===msg.senderemail){
      setuser(!user);
    }
    else{
      setother(!other);
    }
  }
    return (
      <div className='chatmenu'>
        {emoji && <div className='emojcontain'><Emojicontainer/></div>}
        <div className="chatmenu__addreaction" onClick={handleemoji}>
          <img className='chatmenu__image' src="./addreaction.png" alt=""/>
        </div>
        {auth.currentUser.email===msg.senderemail ? <div className="chatmenu__edt" onClick={handleClick}>
          <img className='chatmenu__image' src="./edit.png" alt=""/>
        </div> :<div className="chatmenu__reply" onClick={handleReply}>
         <img className='chatmenu__image' src="./reply.png" alt="reply"/>
        </div>}
        <div className="chatmenu__more" onClick={handlemore}>
          <img className='chatmenu__image' src="./more.png" alt="more" / >
        </div>
      {user && <div className='morebox'>
          <div className="morebox__container">
            <div className="morebox__item" onClick={handleClick}>
              <div className="morebox__item-label">
                Edit message
              </div>
              <div className="morebox__item-icon">
                <EditIcon className={classes.myicon} />
              </div>
            </div>
            <div className="morebox__item" onClick={handleDelete}>
              <div className="morebox__item-deletelabel">
                Delete Message
              </div>
              <div className="morebox_item-icon">
                <DeleteIcon className={classes.deleteicon}/>
              </div>
            </div>
          </div>
        </div>
      }
      {other && <div className='morebox'>
          <div className="morebox__container">
            <div className="morebox__item" onClick={handleReply}>
              <div className="morebox__item-label">
                Reply Message
              </div>
              <div className="morebox_item-icon">
                <ReplyIcon className={classes.myicon}/>
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    )
    }


export default ChatMenu
