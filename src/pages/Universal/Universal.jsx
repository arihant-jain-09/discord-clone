import styled from 'styled-components'
import React from 'react'
import ChatHeader from '../../components/ChatHeader/ChatHeader'
import './Universal.scss'
import { ReactComponent as FriendsLogo } from '../../assets/friends.svg'

const FriendsStyled=styled(FriendsLogo)`
width:2.5rem;
height:2.5rem;
display:flex;
align-items:center;
`
const Universal = ({children}) => {
    console.log('Universal called');
    return (
        <>
                <div className='universal'>
                    <div className="universal__header">
                        <div className="universal__header-sidebar">
                            <div className="universal__header-inputcontainer">
                                <input type="text" className='universal__header-input' placeholder='Find or start a conversation'/>
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
                            <div className="universal__sidebar-container">
                                <div className="universal__sidebar-content">
                                    <div className="universal__sidebar-avatar">
                                       <FriendsStyled/>
                                    </div>
                                    <div className="universal__sidebar-title">
                                        Friends
                                    </div>
                                </div>
                            </div>
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
                        <div className="activity">
                            <div className="activity__container">
                                <div className="activity__container-heading">
                                    ACTIVE NOW
                                </div>
                                <div className="activity__container-content">
                                    <div className="activity__container--head">
                                        It's quiet for now...
                                    </div>
                                    <div className="activity__container--para">
                                    When a friend starts an activity—like playing a game or hanging out on voice—we’ll show it here!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default Universal
