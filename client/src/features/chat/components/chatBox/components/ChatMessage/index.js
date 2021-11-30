import React from 'react';
import ChatPinned from './components/ChatPinned';
import ChatReply from './components/ChatReply';
import ChatSimple from './components/ChatSimple';
const ChatMessage = React.forwardRef(({message}) => {
  return(
    <>
    {message?.pinned ? <ChatPinned message={message}/> : (message?.reply ? <ChatReply message={message}/>:<ChatSimple message={message} />)}
    </>
  )
});

export default ChatMessage
