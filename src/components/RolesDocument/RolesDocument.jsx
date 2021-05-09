import React from 'react'
import { useCollectionData} from 'react-firebase-hooks/firestore'
import { firestore } from '../../firebase/firebase'
import './RolesDocument.scss'
import RolesDocumentmap from './RolesDocumentmap'
const RolesDocument = ({roleid}) => {
    const roleRef=firestore.collection('roles').doc(roleid).collection('rolemenu');
    const query=roleRef.orderBy('createdAt').limit(10);
    const [roles]=useCollectionData(query,{idField:'id'});
    return (
        <>
            <div className="rolesdocument">
                <div className="rolesdocument__main">
                        {roles && roles.map((role)=>{
                            return <RolesDocumentmap key={role.id} role={role}/>
                        })}
                </div>
            </div>
        </>
    )
}

export default RolesDocument
