import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatMessage from '../../components/ChatMessage/ChatMessage'
import ChatSearchBar from '../../components/ChatSearchBar/ChatSearchBar'
import currentserver from '../../redux/server/server.actions'
import './home_serverId.scss'
const Home_serverId = ({location,history,match}) => {
    const dispatch = useDispatch();
    console.log(location);
    console.log(history);
    console.log(match);
    // console.log(match.params.serverId);
    useEffect(() => {
        // dispatch(currentserver({id:match.params.serverId,name:server.servername,email:server.email}))
        return () => {
            
        }
    }, [])
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
