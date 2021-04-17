import { Avatar } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core'
import ChatMenu from '../ChatMenu/ChatMenu'
import ChatEdit from '../ChatEdit/ChatEdit'
import { useSelector } from 'react-redux'
import ChatReply from '../ChatReply/ChatReply'
const useStyles=makeStyles((theme)=>{
    return{
      
    }
})
 const Chatmessagemap=({msg})=> {
    // const [inHover, setHover] = useState(false);
    // console.log(useSelector((state)=>state.reply));
    const classes=useStyles();
    const id=useSelector((state)=>state.msg.id);    
     return (
        <div className={`${msg.reply && 'chatmessage__main--replied'} chatmessage__main`}>
            {/* <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="chatmessage"> */}
            <div className="chatmessage">
                <div className="chatmessage__header">
                    <div className={`${msg.reply&& 'chatmessage__header-photo--replied'} chatmessage__header-photo`}>
                        <Avatar className={classes.avatar} src={`${msg && msg.senderphoto}`}/>
                    </div>
                    <div className="chatmessage__content">
                        <div className="chatmessage__content-reply">
                            { msg.reply && <ChatReply msg={msg}/>}
                        </div>
                        <div className="chatmessage__content-header">
                            <div className="chatmessage__content-name">
                                {`${msg && msg.sendername}`}
                            </div>
                            <div className="chatmessage__content-date">
                                {`${msg.createdAt && 
                                    msg.createdAt.toDate().getDate()+"/"+(msg.createdAt.toDate().getMonth()+1)+"/"+msg.createdAt.toDate().getFullYear()
                                    }`}
                            </div>
                            <div className="chatmessgae__content-menu">
                               {/* {inHover&& <ChatMenu msg={msg} />} */}
                               {<ChatMenu msg={msg}/>}
                            </div>
                        </div>
                        <div className="chatmessage__message">
                         {
                         useSelector((state)=>state.click.clicked) && msg.id===id ? <ChatEdit/>:msg.message
                         }
                            {msg.base64 &&<img src={msg.base64} alt="cannot decode"/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatmessagemap
