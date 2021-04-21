import { Avatar } from '@material-ui/core'
import React from 'react'
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
    // const [inHover, setHover] = useState(false);
    // console.log(useSelector((state)=>state.reply));
    const classes=useStyles();
    const id=useSelector((state)=>state.msg.id);    
    const admin=useSelector((state)=>state.currentrole.admin);
    const linkify=(input)=>{
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return input.match(urlRegex)
    }
    const componentDecorator = (href, text, key) => (
        <a className={`${linkify(msg.message) && 'linkify__videotext'} linkify__text`} href={href} key={key} target="_blank" rel="noreferrer">
          {text}
        </a>
      );
      
      
     return (
         <>
        <div className={`${msg.reply && 'chatmessage__main--replied'} chatmessage__main`}>
            {/* <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="chatmessage"> */}
            <div className="chatmessage">
                <div className="chatmessage__replycontent">
                    {msg.reply && <img className='chatmessage__replycontent--replyimage' src="/discord-reply.png" alt="reply"/>}
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
                            <div className={`${admin.admin === msg.sendername && 'chatmessage__content-admin'} chatmessage__content-name`}>
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
                         useSelector((state)=>state.click.clicked) && msg.id===id ? <ChatEdit/>:
                         <Linkify componentDecorator={componentDecorator}>
                            {msg && !!msg.message ? msg.message : !msg.base64 && <RenderAudio msg={msg}/>}
                            </Linkify>   
                         }
                            {msg.base64 &&<img src={msg.base64} alt="cannot decode"/>}
                            {linkify(msg.message) && <RenderVideo msg={msg.message}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Chatmessagemap
