import React,{useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, makeStyles } from '@material-ui/core';
import { firestore } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import ChatEdit from '../ChatEdit/ChatEdit';
import currentmessage from '../../redux/message/message.actions'
import setclicked from '../../redux/clicked/clicked.actions'

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

function ChatMenu({msg}) {
    const classes=useStyles();
    const dispatch = useDispatch();
    const handleClick = (event) => {
    dispatch(currentmessage({id:msg.id, msg:msg.message}))
    dispatch(setclicked());
  };
    return (
        <div className="chatmenu" >
      <IconButton className={classes.icon} onClick={handleClick}>
         <EditIcon />
      </IconButton>
    </div>
    )
    }


export default ChatMenu
