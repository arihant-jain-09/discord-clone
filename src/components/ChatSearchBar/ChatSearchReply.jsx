import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton, makeStyles} from '@material-ui/core'
import replytoggle from '../../redux/replytoggle/replytoggle.actions'
const useStyles=makeStyles({
    button:{
        margin:0,
        padding:'.1rem',
        color:'#b9bbbe'
    },
    icon:{
        width:'1.8rem'
    }
})
function ChatSearchReply() {
    const classes=useStyles();
    const dispatch = useDispatch();
    return (
        <div>
            <div className='chatsearchbar__reply'>
                <div className="chatsearchbar__reply-text">
                Replying to {useSelector((state)=>state.reply.sender)}
                </div>
                <div className="chatsearchnar__reply-close">
                    <IconButton className={classes.button} onClick={()=>{dispatch(replytoggle())}}>
                        <CancelIcon fontSize='large' className={classes.icon} />
                    </IconButton>
                </div>
            
            </div>
        </div>
    )
}

export default ChatSearchReply
