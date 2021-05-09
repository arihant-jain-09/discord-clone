import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/firebase';
import RolesDocument from './RolesDocument';

const FetchRoleid = () => {
    const serverid=useSelector((state)=>state.currentserver.id);
    const serverRef=firestore.collection('servers').doc(serverid);
    const [serverdata]=useDocumentData(serverRef);
    return (
        <>
            {serverdata && auth.currentUser && <RolesDocument roleid={serverid}/>}
        </>
    )
}

export default FetchRoleid
