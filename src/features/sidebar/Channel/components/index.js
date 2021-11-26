import React, { useEffect, useState } from 'react'
import './styles/channelPage.scss'
import {auth} from '../../../../firebase/firebase'
import {ReactComponent as Down} from '../../../../assets/down.svg'
import {ReactComponent as MicOff} from '../../../../assets/mic-off.svg'
import {ReactComponent as MicOn} from '../../../../assets/mic-on.svg'
import {ReactComponent as EarphoneOff} from '../../../../assets/earphone-off.svg'
import {ReactComponent as EarphoneOn} from '../../../../assets/earphone-on.svg'
import {ReactComponent as Settings} from '../../../../assets/settings.svg'
import { getDocs,getFirestore,collection,query,orderBy } from "firebase/firestore";
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import SingleChannel from './SingleChannel'
import { setCurrentChannel } from '../channelSlice'
const ChannelPageIndex = () => {
  const [micOn,setMicOn]=useState(false);
  const [earphoneOn,setEarphoneOn]=useState(false);
  const [channels,setChannels]=useState([]);
  const location=useLocation();
  const history=useHistory();
  const currentServer=useSelector((state)=>state.server.currentServer);
  const dispatch = useDispatch();
  useEffect(() => {
    const db=getFirestore();
    const getChannels=async()=>{
      const channelList=[];
      const queryRef = query(collection(db, "servers", currentServer.id, "channels"),orderBy("createdAt", "asc"));
      const channelRef = await getDocs(queryRef);
      channelRef.forEach((channel)=>{
        channelList.push({...channel.data(),id:channel.id});
      })
      setChannels(channelList);
      dispatch(setCurrentChannel({
        id:channelList[0].id,
        name:channelList[0].channel,
        email:channelList[0].email,
      }));
      history.push(`/channels/${currentServer?.id}/${channelList[0].id}`);
    }
    if(currentServer && currentServer.id){
      getChannels();
    }
    else if(currentServer.id==null){
      setChannels([]);
    }
    return () => {
    }
  }, [currentServer,dispatch,history])

  return (
    <>
      <div className="channelPage">
        <div className="channelPage__header">
          {location.pathname==='/channels/@me' ? <>
            <div className="channelPage__header-inputContainer">
              <input placeholder="Find or start a conversation"/>
            </div>
          </>:<>
            <div className="channelPage__header-name">
                {currentServer?.name}
              </div>
              <div className="channelPage__header-down">
                <Down/>
              </div>
            </>
          }
        </div>
        <div className="channelPage__body">
          {currentServer?.id && channels?.map((channel)=>{
            return <SingleChannel key={channel.id} channel={channel}/>
          })}
        </div>
        <div className="channelPage__footer">
          <div className="channelPage__footer-avatar">
            <img src={auth?.currentUser?.photoURL} alt="avatar"/>
          </div>
          <div className="channelPage__footer-text">
            <div className="channelPage__footer-text--primary">
              {auth?.currentUser?.displayName}
            </div>
            <div className="channelPage__footer-text--secondary">
            #{auth?.currentUser?.uid.slice(0,5)}
              </div>
          </div>
          <div className="channelPage__footer-icons">
            <button onClick={()=>setMicOn(!micOn)}>
              {micOn ? <MicOn/>:<MicOff className="channelPage__footer-icons--Off"/>}
            </button>
            <button onClick={()=>setEarphoneOn(!earphoneOn)}>
              {earphoneOn ? <EarphoneOn/>:<EarphoneOff className="channelPage__footer-icons--Off"/>}
            </button>
            <button><Settings/></button>
          </div>
        </div>
      </div> 
    </>
  )
}

export default ChannelPageIndex
