import React from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import currentdoc from '../../redux/document/document.actions';
export default function SidebarChannel() {
    const channelRef=firestore.collection('channels');
      const query=channelRef.orderBy('createdAt').limit(10);
      const [channels]=useCollectionData(query,{idField:'id'});
      const dispatch = useDispatch();
    return (
        <div>
            <div className="sidebarchannel">
                {channels && channels.map((msg)=>{
                    return <p key={msg.id} onClick={()=>{dispatch(currentdoc({id:msg.id,name:msg.channel}))}} className="sidebarchannel__content"><span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
                })}               
            </div>
        </div>
    )
}
