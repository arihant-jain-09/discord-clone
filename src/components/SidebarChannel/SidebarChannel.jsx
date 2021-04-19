import React, { useEffect } from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
import { useDispatch, useSelector } from 'react-redux';
import currentdoc from '../../redux/document/document.actions';
export default function SidebarChannel() {
    const dispatch = useDispatch();
      const currentserverid=useSelector((state)=>state.currentserver.id)
      const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
      const query=channelRef.orderBy('createdAt').limit(10);
      const [channels]=useCollectionData(query,{idField:'id'});
      useEffect(() => {
          if(channels && !!channels.length){
            dispatch(currentdoc({id:channels[0].id,name:channels[0].channel}));
          }
        return () => {   
        }
    }, [channels,dispatch])
      
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
