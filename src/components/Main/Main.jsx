import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import './Main.scss'
import SidebarChannel from '../SidebarChannel/SidebarChannel';
import BadgeAvatars from '../Avatar/BadgeAvatar';
import Sidebarvoice from '../Sidebarvoice/Sidebarvoice';
function Main() {
    return (
        <div>
            <div className='main'>
                <div className='main__sidebar'>
                    <div className="main__sidebar-header">
                        <p className='main__sidebar-currentchannel'>Coders</p>
                        <div className="main__sidebar-expandicon"><ExpandMoreIcon/></div>
                    </div>
                    <div className='main__channels'>
                        <div className="main__channels-header">
                            <div className="main__channels-expandicon"><ExpandMoreIcon/></div>
                            <p>Text Channels</p>
                            <div className="main__channels-addicon"><AddIcon /></div>
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
            <div className="main__details">

            </div>
        </div>
    </div>
    )
}

export default Main
