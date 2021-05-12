import React, { useEffect, useState } from 'react'
import './SidebarChannel.scss'
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
import { useSelector } from 'react-redux';
const SidebarChannel=()=>{
    const currentserverid=useSelector((state)=>state.currentserver.id)
    // console.log(currentserverid);
    const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
    const [channels,setchannels]=useState([]);
    useEffect(() => {
        let data=[]
          const myfun=async()=>{
          await channelRef.orderBy('createdAt').get().then((snapshot)=>{
              snapshot.docs.map((doc)=>{
                  const mychannel=doc.data();
                  mychannel.id=doc.id
                  return data.push(mychannel)
              })
          })
          setchannels(data)
          }   
          myfun();    return () => {
            
        }
    }, [currentserverid])
  return (
      <div>
          <div className="sidebarchannel">
              {channels && !!channels.length && channels.map((msg)=>{
                  return <Channelmap key={msg.id} msg={msg}/>
              })}               
          </div>
      </div>
  )
}

export default (SidebarChannel)