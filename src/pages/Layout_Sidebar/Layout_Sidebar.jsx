import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatHeader from '../../components/ChatHeader/ChatHeader'
import './Layout_Sidebar.scss'
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            padding:theme.spacing(1),
            color:'#fff'
        }
    }
})
const LayoutSidebar = ({children}) => {
    const classes=useStyles();
    return (
        <>
            {/* <div className="mainpage"> */}
                {/* <div className="mainpage__servers">
                    <div className="mainpage__servers--add">
                        <Addserver/>
                    </div>
                    <div className="mainpage__servers-display">
                        <AvailableServers/>
                    </div>
                </div> */}
                <div className='main'>
                    <div className="main__header">
                        <div className="main__header-sidebar">
                                <p className='main__header-currentchannel'>{useSelector((state)=>state.currentserver.name)}</p>
                                <div className="main__header-expandicon">
                                    <IconButton className={classes.button} aria-label="settings">
                                        <ExpandMoreIcon fontSize='large'/>
                                    </IconButton>
                                </div>
                        </div>
                        <div className="main__header-chatbar">
                            <div className="main__header--chat">
                                <ChatHeader/>
                            </div>
                        </div>
                    </div>
                    <div className="main__content">
                        {/* <div className='main__sidebar'>
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
                        </div> */}
                        {children}
                        {/* <div className="chat">
                            <div className='chat__message'>
                                <ChatMessage/>
                            </div>
                            <div className="chat__searchbar">
                                <ChatSearchBar/>
                            </div>
                        </div> */}
                        {/* <div className="main__roles">
                            <Roles/>
                        </div> */}
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default LayoutSidebar
