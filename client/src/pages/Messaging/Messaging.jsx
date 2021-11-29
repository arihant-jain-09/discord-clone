import React from 'react'
import ChatHeader from '../../features/chat/components/header/components'
import ChatBox from '../../features/chat/components/chatBox/components'
import './Messaging.scss'
import ChatKeyboard from '../../features/chat/components/chatKeyboard/components'
const Messaging = () => {
  return (
    <>
      <ChatHeader/> 
      <ChatBox/>
      <ChatKeyboard/>
    </>
  )
}

export default Messaging
