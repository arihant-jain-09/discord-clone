import React from 'react'
import './SidebarChannel.scss'
export default function SidebarChannel({id,channel}) {
    return (
        <div>
            <div className="sidebarchannel">
            <p className="sidebarchannel__content"><span className='sidebarchannel__hash'>#</span>React</p>
            <p className="sidebarchannel__content"><span className='sidebarchannel__hash'>#</span>Firebase</p>
               
            </div>
            
        </div>
    )
}
