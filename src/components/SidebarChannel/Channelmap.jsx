import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory} from 'react-router';
// import currentdoc from '../../redux/document/document.actions'
import './SidebarChannel.scss'

// const Channelmap=React.memo((props)=>{
//     console.log('Channel map called');
//     const {msg}=props;
//     const history=useHistory();
//     const id=useSelector((state)=>state.doc.id);
//     const currentserverid=useSelector((state)=>state.currentserver.id)
//     return (
//         <div>
//              <p key={msg.id} onClick={async()=>{
//                  await history.push(`/channels/${currentserverid}/${msg.id}`)
//                 }}
//                 className={`${id===msg.id && `clicked`} sidebarchannel__content`}>
//                 <span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
//         </div>
//     )
// },(prevProps, nextProps) => prevProps.msg === nextProps.msg)

const Channelmap=({msg})=>{
    console.log('Channel map called');
    // const {msg}=props;
    const history=useHistory();
    const id=useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id)
    return (
        <div>
             <p key={msg.id} onClick={async()=>{
                 await history.push(`/channels/${currentserverid}/${msg.id}`)
                }}
                className={`${id===msg.id && `clicked`} sidebarchannel__content`}>
                <span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
        </div>
    )
}

export default Channelmap
