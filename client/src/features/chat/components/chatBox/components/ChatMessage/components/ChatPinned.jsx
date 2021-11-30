import React from 'react'
import '../styles/chat.pinned.scss'
const ChatPinned = ({message}) => {
  const date=new Date(message.createdAt);
  const hightlightMessage=()=>{
    const el=document.getElementById(`${message.pinned}`);
    el.classList.add('highlight');
    setTimeout(() => {
      el.classList.remove('highlight');
    }, 3000);
  }
  return (
    <>
      <div className='chatPinned'>
        <div className="chatPinned__img">
          <img src={message.sender.img} alt={message.sender.name.slice(0,1)}/>
        </div>
        <div className="chatPinned__content">
          <div className='chatPinned__content-text'>
            <span>{message.pinned.sender_name}</span> pinned <span onClick={hightlightMessage}>a message</span> to this channel.
          </div>
          <div className="chatPinned__content-date">
            {`${date && date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}`}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPinned
