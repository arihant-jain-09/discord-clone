import React from 'react'
import './ChatMessage.scss'
const ChatMessage = ({message}) => {
  const date=new Date(message.createdAt);
  return (
    <>
      <div className='chatMessage'>
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
          </div>
          <div className="chatMessage__content-message">
            {message.text}
        </div>
        </div>
      </div>
    </>
  )
}

export default ChatMessage
