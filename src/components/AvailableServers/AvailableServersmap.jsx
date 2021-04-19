import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import currentserver from '../../redux/server/server.actions';
import './AvailableServers.scss'
function AvailableServersmap({server}) {
    const dispatch = useDispatch();
    const id=useSelector((state)=>state.currentserver.id)
    return (
        <div className='availableserver__map'>
            <img key={server.id} onClick={()=>{
                 dispatch(currentserver({id:server.id,name:server.servername}))
                }}
                className={`${id===server.id && `availableserver__map-clicked`} availableserver__map-image`}
                src={server.serverimage} alt="availableserver image"
                >
                </img>
                
        </div>
    )
}

export default AvailableServersmap
