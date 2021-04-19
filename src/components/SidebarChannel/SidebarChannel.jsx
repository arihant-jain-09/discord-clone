import React from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
import { useSelector } from 'react-redux';
export default function SidebarChannel() {
      const currentserverid=useSelector((state)=>state.currentserver.id)
      const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
      const query=channelRef.orderBy('createdAt').limit(10);
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
