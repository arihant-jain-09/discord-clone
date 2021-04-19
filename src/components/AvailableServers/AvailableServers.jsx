import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import AvailableServersmap from './AvailableServersmap';
import './AvailableServers.scss'
function AvailableServers() {
    const serverRef=firestore.collection('servers');
    const query=serverRef.orderBy('createdAt').limit(10);
    const [servers]=useCollectionData(query,{idField:'id'});
    return (
        <div className='availableserver'>
            {servers && servers.map((server)=>{
                    return <AvailableServersmap key={server.id} server={server}/>
                })} 
        </div>
    )
}

export default AvailableServers
