import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import currentdoc from '../../redux/document/document.actions'
import './SidebarChannel.scss'
function Channelmap({msg}) {
    const dispatch = useDispatch();
    const id=useSelector((state)=>state.doc.id);
    return (
        <div>
             <p key={msg.id} onClick={()=>{
                 dispatch(currentdoc({id:msg.id,name:msg.channel}))
                }}
                className={`${id===msg.id && `clicked`} sidebarchannel__content`}>
                <span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
        </div>
    )
}

export default Channelmap
