import React from 'react'
import '../styles/chat.pinned.scss'
const ChatPinned = ({message}) => {
  const date=new Date(message.createdAt);
  return (
    <>
      <div className='chatPinned'>
        <div className="chatPinned__img">
          <img src={message.sender.img} alt={message.text.slice(0,1)}/>
        </div>
        <div className="chatPinned__content">
          <div className='chatPinned__content-text'>
            {message.text}
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
