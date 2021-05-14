import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core'
import ChatMenu from '../ChatMenu/ChatMenu'
import ChatEdit from '../ChatEdit/ChatEdit'
import { useSelector } from 'react-redux'
import ChatReply from '../ChatReply/ChatReply'
import Linkify from 'react-linkify';
import RenderVideo from './RenderVideo'
import RenderAudio from './RenderAudio'
const useStyles=makeStyles((theme)=>{
    return{
      avatar:{
          width:theme.spacing(4.5),
          height:theme.spacing(4.5)
      }
    }
})
 const Chatmessagemap=({msg})=> {
    const [inHover, setHover] = useState(false);
    const message=msg.message.replaceAll("\\n", "\n");
    const classes=useStyles();
    const id=useSelector((state)=>state.msg.id); 
    const admin=useSelector((state)=>state.currentrole.admin);
    const chatedittoggle=useSelector((state)=>state.click.clicked);
    const linkify=(input)=>{
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return input.match(urlRegex)
    }
    // console.log(msg.message,linkify("Cool time-lapse animation of the number of submarine data cables (internet backbone) since 1989 - https://youtu.be/6dkiqJ_IZGw\nhttps://www.youtube.com/watch?v=2ApV7zqd7no&list=RDMM&index=13"));
    const linkifiedmsg=linkify(message);
    const componentDecorator = (href, text, key) => (
        <a className={`${linkifiedmsg && 'linkify__videotext'} linkify__text`} href={href} key={key} target="_blank" rel="noreferrer">
          {text}
        </a>
      );
      
     return (
         <>
        <div className={`${msg.reply && 'chatmessage__main--replied'} chatmessage__main ${chatedittoggle && id===msg.id && 'chatmessage__main--edit'}`}>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="chatmessage">
            <div className="chatmessage">
                <div className="chatmessage__replycontent">
                    {msg.reply && <img className='chatmessage__replycontent--replyimage' src="/discord-clone/discord-reply.png" alt="reply"/>}
                    <div className="chatmessage__replycontent--content">
                            { msg.reply && <ChatReply msg={msg}/>}
                        </div>
                </div>
                <div className="chatmessage__header">
                    <div className={`${msg.reply&& 'chatmessage__header-photo--replied'} chatmessage__header-photo`}>
                        <Avatar className={classes.avatar} src={`${msg && msg.senderphoto}`}/>
                    </div>
                    <div className="chatmessage__content">
                        <div className="chatmessage__content-header">
                            <div className={`${admin && admin.admin === msg.sendername && 'chatmessage__content-admin'} chatmessage__content-name`}>
                                {`${msg && msg.sendername}`}
                            </div>
                            <div className="chatmessage__content-date">
                                {`${msg.createdAt && 
                                    msg.createdAt.toDate().getDate()+"/"+(msg.createdAt.toDate().getMonth()+1)+"/"+msg.createdAt.toDate().getFullYear()
                                    }`}
                            </div>
                            <div className={`${msg.reply && 'chatmessage__content-menu--replied'} chatmessage__content-menu chatmessage__content-menu-normal`}>
                               {inHover&& <ChatMenu msg={msg} />}
                               {/* {<ChatMenu msg={msg}/>} */}
                               {/* {console.log(id===msg.id)} */}
                            </div>
                        </div>
                        <div className="chatmessage__message">
                         {
                         useSelector((state)=>state.click.clicked) && msg.id===id ? <ChatEdit msg={message} msgid={msg.id}/>:
                         <Linkify componentDecorator={componentDecorator}>
                            {msg && !!msg.message ? message : !msg.base64 && <RenderAudio msg={msg}/>}
                            </Linkify>   
                         }
                            {msg.base64 &&<img src={msg.base64} alt="cannot decode"/>}
                            {linkifiedmsg && linkifiedmsg.length>1?linkifiedmsg.map((link)=><RenderVideo key={link} msg={link}/>):<RenderVideo msg={linkifiedmsg}/>}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Chatmessagemap
