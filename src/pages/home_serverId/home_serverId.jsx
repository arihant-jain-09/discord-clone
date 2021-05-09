import React from 'react'
import ChatMessage from '../../components/ChatMessage/ChatMessage'
import ChatSearchBar from '../../components/ChatSearchBar/ChatSearchBar'
import './home_serverId.scss'
const Home_serverId = () => {
    return (
        <>
            <div className="chat">
                <div className='chat__message'>
                    <ChatMessage/>
                </div>
                <div className="chat__searchbar">
                    <ChatSearchBar/>
                </div>                    
            </div>
        </>
    )
}

export default Home_serverId
