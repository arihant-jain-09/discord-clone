import React from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
export default function SidebarChannel() {
    const channelRef=firestore.collection('channels');
      const query=channelRef.orderBy('createdAt').limit(10);
      const [channels]=useCollectionData(query,{idField:'id'});
    return (
        <div>
            <div className="sidebarchannel">
                {channels && channels.map((msg)=>{
                    return <p className="sidebarchannel__content"><span className='sidebarchannel__hash'>#</span>{msg.channel}</p>
                })}               
            </div>
        </div>
    )
}
