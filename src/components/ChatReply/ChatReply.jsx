import { Avatar, makeStyles } from '@material-ui/core';
import React from 'react'
import ImageIcon from '@material-ui/icons/Image';
import './ChatReply.scss'
import { useSelector } from 'react-redux';
const useStyles=makeStyles((theme)=>{
    return{
        small:{
            width:theme.spacing(2.2),
            height:theme.spacing(2.2),
            marginRight:theme.spacing(.5)
        }
    }
})
function ChatReply({msg}) {
    const admin=useSelector((state)=>state.currentrole.admin)
    const classes=useStyles();
    return (
        <div className='chatreply'>
            <div className="chatreply__photo">
                <Avatar className={classes.small} src={msg.reply.photo}/>
            </div>
            <div className={`${admin && admin.admin === msg.reply.sender && 'chatreply__sender-admin'} chatreply__sender`}>
                @{msg.reply.sender}
            </div>
            <div className="chatreply__message">
                {msg.reply.msg ? msg.reply.msg.slice(0,100)+"..." :  <ImageIcon/> }
            </div>
        </div>
    )
}

export default ChatReply
