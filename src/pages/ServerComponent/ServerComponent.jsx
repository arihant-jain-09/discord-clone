import React from 'react'
import Addserver from '../../components/AddServer/Addserver'
import AvailableServers from '../../components/AvailableServers/AvailableServers'
import './ServerComponent.scss'
const Sidebar = () => {
    return (
        <>
        <div className="mainpage">
            <div className="mainpage__servers">
                <div className="mainpage__servers-display">
                        <AvailableServers/>
                </div>
                <div className="mainpage__servers--add">
                        <Addserver/>
                </div>
            </div>
            </div>
        </>
    )
}

export default Sidebar
