import React, { useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import AvailableServersmap from './AvailableServersmap';
import './AvailableServers.scss'
import currentserver from '../../redux/server/server.actions';
import { useDispatch, useSelector} from 'react-redux';
function AvailableServers () {
    const dispatch = useDispatch();
    const serverRef=firestore.collection('servers');
    const query=serverRef.orderBy('createdAt').limit(10);
    const [servers]=useCollectionData(query,{idField:'id'});
    const newserver=useSelector((state)=>state.newserver.present);
    useEffect(() => {
        if(newserver){
            return
        }
        else{
            if(servers && !!servers.length){
                dispatch(currentserver({id:servers[0].id,name:servers[0].servername,email:servers[0].email,roleid:servers[0].roleid}));
            }
        }
        return () => {   
        }
    }, [servers,newserver,dispatch])
    // useEffect(() => {
    //         if(newserver){
    //             dispatch()
    //         }
    //     return () => {
            
    //     }
    // }, [newserver])
          return (
        <div className='availableserver'>
            {servers && servers.map((server)=>{
                    return <AvailableServersmap key={server.id} server={server}/>
                })} 
        </div>
    )
}

export default AvailableServers
