import { useSelector } from 'react-redux'
import { useHistory} from 'react-router';
import './SidebarChannel.scss'
const Channelmap=({msg})=>{
    const history=useHistory();
    const id=useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id)
    return (
        <div>
             <p key={msg.id} onClick={()=>{
                 history.push(`/discord-clone/channels/${currentserverid}/${msg.id}`)
                }}
                className={`${id===msg.id && `clicked`} sidebarchannel__content`}>
                <span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
        </div>
    )
}

export default Channelmap
