import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/firebase';
import currentserver from '../../redux/server/server.actions';
import './AvailableServers.scss'
function AvailableServersmap({server}) {
    const dispatch = useDispatch();
    const id=useSelector((state)=>state.currentserver.id)
    const myserver=server;
    console.log(myserver);
    useEffect(() => {
        if(myserver.email===auth.currentUser.email){
            dispatch(currentserver({id:myserver.id,name:myserver.servername}));
        }
        return () => {   
        }
    }, [myserver,dispatch])
    return (
        <div className='availableserver__map'>
            <img key={server.id} onClick={()=>{
                 dispatch(currentserver({id:server.id,name:server.servername}))
                }}
                className={`${id===server.id && `availableserver__map-clicked`} availableserver__map-image`}
                src={server.serverimage} alt="availableserver"
                >
                </img>
        </div>
    )
}

export default AvailableServersmap
