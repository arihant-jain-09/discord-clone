import React, { useEffect } from 'react'
import './SidebarChannel.scss'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
import { useDispatch, useSelector } from 'react-redux';
import currentdoc from '../../redux/document/document.actions';
import { useHistory, useLocation } from 'react-router';

const SidebarChannel=React.memo(()=>{

    const history=useHistory();
    const location=useLocation();
    const dispatch = useDispatch();
      const currentserverid=useSelector((state)=>state.currentserver.id)
      const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
      const query=channelRef.orderBy('createdAt').limit(10);
      const [channels]=useCollectionData(query,{idField:'id'});
      console.log('Sidebar got rendered');
    //   useEffect(() => {
    //       const myfun=async()=>{
    //         if(channels && !!channels.length){
    //             await history.push(`${location.pathname}/${channels[0].id}`)
    //             // dispatch(currentdoc({id:channels[0].id,name:channels[0].channel}));
    //           }
    //       }
    //       myfun();
    //     return () => {   
    //     }
    // }, [channels,dispatch])
    return (
        <div>
            <div className="sidebarchannel">
                {channels && channels.map((msg)=>{
                    return <Channelmap key={msg.id} msg={msg}/>
                })}               
            </div>
        </div>
    )
})

export default SidebarChannel