import React, { useState } from 'react'
import './styles/channelPage.scss'
import {ReactComponent as Down} from '../../../../assets/down.svg'
import {ReactComponent as MicOff} from '../../../../assets/mic-off.svg'
import {ReactComponent as MicOn} from '../../../../assets/mic-on.svg'
import {ReactComponent as EarphoneOff} from '../../../../assets/earphone-off.svg'
import {ReactComponent as EarphoneOn} from '../../../../assets/earphone-on.svg'
import {ReactComponent as Settings} from '../../../../assets/settings.svg'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import SingleChannel from './SingleChannel'
// import { setCurrentChannel } from '../channelSlice'
const ChannelPageIndex = () => {
  const [micOn,setMicOn]=useState(false);
  const [earphoneOn,setEarphoneOn]=useState(false);
  const location=useLocation();
  const history=useHistory();
  const currentServer=useSelector((state)=>state.server.currentServer);
  const channels=useSelector((state)=>state.channel.channels);
  const auth=useSelector((state)=>state.auth.user);
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
                {currentServer?.server_name}
              </div>
              <div className="channelPage__header-down">
                <Down/>
              </div>
            </>
          }
        </div>
        <div className="channelPage__body">
          {currentServer?._id && channels?.map((channel)=>{
            return <SingleChannel key={channel._id} channel={channel}/>
          })}
        </div>
        <div className="channelPage__footer">
          <div className="channelPage__footer-avatar">
            <img src={auth?.photo[0].value} alt="avatar"/>
          </div>
          <div className="channelPage__footer-text">
            <div className="channelPage__footer-text--primary">
              {auth?.displayName}
            </div>
            <div className="channelPage__footer-text--secondary">
            #{auth?._id.slice(0,5)}
              </div>
          </div>
          <div className="channelPage__footer-icons">
            <button onClick={()=>setMicOn(!micOn)}>
              {micOn ? <MicOn/>:<MicOff className="channelPage__footer-icons--Off"/>}
            </button>
            <button onClick={()=>setEarphoneOn(!earphoneOn)}>
              {earphoneOn ? <EarphoneOn/>:<EarphoneOff className="channelPage__footer-icons--Off"/>}
            </button>
            <button onClick={()=>{
              history.push('/api/logout')
              window.location.reload();
            }}><Settings/></button>
          </div>
        </div>
      </div> 
    </>
  )
}

export default ChannelPageIndex
