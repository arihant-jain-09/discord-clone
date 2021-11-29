import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import ChatEdit from '../ChatEdit/ChatEdit';
import ChatMenu from '../ChatMenu/ChatMenu';
import './ChatMessage.scss'
const ChatMessage = ({message}) => {
  const [inHover,setHover]=useState(false);
  const date=new Date(message.createdAt);
  const edit=useSelector((state)=>state.message.edit);
  return (
    <>
      <div className='chatMessage' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="chatMessage__img">
          <img src={message.sender.img} alt={message.text.slice(0,1)}/>
        </div>
        <div className="chatMessage__content">
          <div className="chatMessage__content-header">
            <div className='chatMessage__content-header--name'>
              {message.sender.name}
            </div>
            <div className="chatMessage__content-header--date">
            {`${date && date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}`}
            </div>
            <div className='chatMessage__content-header--menu'>
              {inHover&& <ChatMenu msg={message} />}
            </div>
          </div>
          <div className="chatMessage__content-message">
            {edit?._id===message._id ? <ChatEdit msg={message}/> : message.text}
            {edit?._id!==message._id && <span className='chatMessage__content-message--edited'>{message?.edited===true && '(edited)'}</span>}
        </div>
        </div>
      </div>
    </>
  )
}

export default ChatMessage
