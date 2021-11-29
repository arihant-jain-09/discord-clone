import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import ChatEdit from '../../ChatEdit/ChatEdit';
import ChatMenu from '../../ChatMenu';
import '../styles/chat.simple.scss'
const ChatSimple = ({message}) => {
  const [inHover,setHover]=useState(false);
  const date=new Date(message.createdAt);
  const edit=useSelector((state)=>state.message.edit);
  return (
    <>
      <div className='chatSimple' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="chatSimple__img">
          <img src={message.sender.img} alt={message.text.slice(0,1)}/>
        </div>
        <div className="chatSimple__content">
          <div className="chatSimple__content-header">
            <div className='chatSimple__content-header--name'>
              {message.sender.name}
            </div>
            <div className="chatSimple__content-header--date">
            {`${date && date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}`}
            </div>
            <div className='chatSimple__content-header--menu'>
              {inHover&& <ChatMenu msg={message} />}
            </div>
          </div>
          <div className="chatSimple__content-message">
            {edit?._id===message._id ? <ChatEdit msg={message}/> : message.text}
            {edit?._id!==message._id && <span className='chatSimple__content-message--edited'>{message?.edited===true && '(edited)'}</span>}
        </div>
        </div>
      </div>
    </>
  )
}

export default ChatSimple
