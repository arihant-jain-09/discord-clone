import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Main.scss'
import SidebarChannel from '../SidebarChannel/SidebarChannel';
import BadgeAvatars from '../Avatar/BadgeAvatar';
import Sidebarvoice from '../Sidebarvoice/Sidebarvoice';
import ChatHeader from '../ChatHeader/ChatHeader';
import { IconButton,makeStyles } from '@material-ui/core';
import ChatSearchBar from '../ChatSearchBar/ChatSearchBar';

import AddChannelPopup from '../AddChannelPopup/AddChannelPopup'
import ChatMessage from '../ChatMessage/ChatMessage';
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            padding:theme.spacing(1),
            color:'#fff'
        }
    }
})
function Main() {
    const classes=useStyles();

    return (
        <div>
            <div className='main'>
                <div className='main__sidebar'>
                    <div className="main__sidebar-header">
                        <p className='main__sidebar-currentchannel'>Coding</p>
                        <div className="main__sidebar-expandicon">
                            <IconButton className={classes.button} aria-label="settings">
                                <ExpandMoreIcon fontSize='large'/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='main__channels'>
                        <div className="main__channels-header">
                            <div className="main__channels-expandicon">
                            <IconButton className={classes.button} aria-label="settings">
                                <ExpandMoreIcon/>
                            </IconButton>
                                </div>
                            <p>Text Channels</p>
                            <div className="main__channels-addicon">
                                <AddChannelPopup/>
                            </div>
                        </div>
                        <div className="main__channels-list">
                            <SidebarChannel/>
                        </div>
                    </div>
                    <div className="main__voice">
                        <Sidebarvoice/>
                    </div>
                    <div className="main__avatar">
                            <BadgeAvatars/>
                    </div>
                </div>
            <div className="chat">
                <div className="chat__header">
                    <ChatHeader/>
                </div>
                <div className='chat__message'>
                    <ChatMessage/>
                </div>
                <div className="chat__searchbar">
                    <ChatSearchBar/>
                </div>
            </div>
            <div className="online">
            
            </div>
        </div>
    </div>
    )
}

export default Main