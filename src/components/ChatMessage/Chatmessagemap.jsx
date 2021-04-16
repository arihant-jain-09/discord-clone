import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core'
import ChatMenu from '../ChatMenu/ChatMenu'
import ChatEdit from '../ChatEdit/ChatEdit'
import { useSelector } from 'react-redux'
const useStyles=makeStyles((theme)=>{
    return{
      
    }
})
 const Chatmessagemap=({msg})=> {
    // const [inHover, setHover] = useState(false);
    const classes=useStyles();
    const id=useSelector((state)=>state.msg.id);
     return (
        <div className="chatmessage__main">
            {/* <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="chatmessage"> */}
            <div className="chatmessage">
                <div className="chatmessage__header">
                    <div className="chatmessage__header-photo">
                        <Avatar className={classes.avatar} src={`${msg && msg.senderphoto}`}/>
                    </div>
                    <div className="chatmessage__content">
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
                         {useSelector((state)=>state.click.clicked) && msg.id===id && <ChatEdit/>}
                        {`${msg && msg.message}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatmessagemap
