import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Addserver from '../../components/AddServer/Addserver'
import AvailableServers from '../../components/AvailableServers/AvailableServers'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatHeader from '../../components/ChatHeader/ChatHeader'
import AddChannelPopup from '../../components/AddChannelPopup/AddChannelPopup'
import SidebarChannel from '../../components/SidebarChannel/SidebarChannel'
import Sidebarvoice from '../../components/Sidebarvoice/Sidebarvoice'
import BadgeAvatars from '../../components/Avatar/BadgeAvatar'
import Roles from '../../components/Roles/Roles'
import './Universal.scss'
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            padding:theme.spacing(1),
            color:'#fff'
        }
    }
})
const Universal = ({children}) => {
    const classes=useStyles();
    console.log('Universal called');
    return (
        <>
            <div className="mainpage">
                <div className="mainpage__servers">
                    <div className="mainpage__servers--add">
                        <Addserver/>
                    </div>
                    <div className="mainpage__servers-display">
                        <AvailableServers/>
                    </div>
                </div>
                <div className='universal'>
                    <div className="universal__header">
                        <div className="universal__header-sidebar">
                                <p className='universal__header-currentchannel'>{useSelector((state)=>state.currentserver.name)}</p>
                                <div className="universal__header-expandicon">
                                    <IconButton className={classes.button} aria-label="settings">
                                        <ExpandMoreIcon fontSize='large'/>
                                    </IconButton>
                                </div>
                        </div>
                        <div className="universal__header-chatbar">
                            <div className="universal__header--chat">
                                <ChatHeader/>
                            </div>
                        </div>
                    </div>
                    <div className="universal__content">
                        <div className='universal__sidebar'>
                            {/* <div className='universal__channels'>
                                <div className="universal__channels-header">
                                    <div className="universal__channels-expandicon">
                                    <IconButton className={classes.button} aria-label="settings">
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                        </div>
                                    <p>Text Channels</p>
                                    <div className="universal__channels-addicon">
                                        <AddChannelPopup/>
                                    </div>
                                </div>
                                <div className="universal__channels-list">
                                    <SidebarChannel/>
                                </div>
                            </div>
                            <div className="universal__voice">
                                <Sidebarvoice/>
                            </div>
                            <div className="universal__avatar">
                                    <BadgeAvatars/>
                            </div> */}
                        </div>
                        {children}
                        {/* <div className="chat">
                            <div className='chat__message'>
                                <ChatMessage/>
                            </div>
                            <div className="chat__searchbar">
                                <ChatSearchBar/>
                            </div>
                        </div> */}
                        <div className="universal__roles">
                            {/* <Roles/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Universal
