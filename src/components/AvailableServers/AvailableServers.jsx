import React, { useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import AvailableServersmap from './AvailableServersmap';
import './AvailableServers.scss'
import currentserver from '../../redux/server/server.actions';
import { useDispatch } from 'react-redux';
function AvailableServers () {
    const dispatch = useDispatch();
    const serverRef=firestore.collection('servers');
    const query=serverRef.orderBy('createdAt').limit(10);
    const [servers]=useCollectionData(query,{idField:'id'});
    useEffect(() => {
            if(servers && !!servers.length){
                dispatch(currentserver({id:servers[0].id,name:servers[0].servername}));
            }
        return () => {   
        }
    }, [servers,dispatch])
       return (
        <div className='availableserver'>
            {servers && servers.map((server)=>{
                    return <AvailableServersmap key={server.id} server={server}/>
                })} 
        </div>
    )
}

export default AvailableServers
