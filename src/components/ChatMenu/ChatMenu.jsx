import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, makeStyles } from '@material-ui/core';
import { auth, firestore } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import currentmessage from '../../redux/message/message.actions'
import setclicked from '../../redux/clicked/clicked.actions'
import DeleteIcon from '@material-ui/icons/Delete';
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
        }
    }
})

function ChatMenu({msg}) {
    const classes=useStyles();
    const dispatch = useDispatch();
    const currentid=useSelector((state)=>state.doc.id);
    const handleClick = () => {
        dispatch(currentmessage({id:msg.id, msg:msg.message}))
        dispatch(setclicked());
  };
  const handleDelete=()=>{
    const docRef=firestore.collection('channels').doc(currentid).collection('messages').doc(msg.id);
    docRef.delete();
  }
    return (
        <div className={classes.chatmenu}>
          {auth.currentUser.email===msg.senderemail &&(<>
            <IconButton className={classes.icon} onClick={handleClick}>
              <EditIcon />
            </IconButton>
            <IconButton className={classes.icon} onClick={handleDelete}>
              <DeleteIcon/>
            </IconButton>
          </>)}
      
    </div>
    )
    }


export default ChatMenu
