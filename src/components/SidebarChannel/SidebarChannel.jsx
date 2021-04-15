import React from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
export default function SidebarChannel() {
    const channelRef=firestore.collection('channels');
      const query=channelRef.orderBy('createdAt').limit(10);
      console.log(query);
      const [channels]=useCollectionData(query,{idField:'id'});

    return (
        <div>
            <div className="sidebarchannel">
                {channels && channels.map((msg)=>{
                    return <Channelmap key={msg.id} msg={msg}/>
                })}               
            </div>
        </div>
    )
}
