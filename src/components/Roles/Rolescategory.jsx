import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase'
import Myroles from './Myroles';

const Rolescategory = ({role}) => {
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const rolemap=firestore.collection('servers').doc(currentserverid).collection('allroles').doc(role.id).collection('allroles');
    const [allroleusers]=useCollectionData(rolemap,{idField:'id'});
    return (
        <>
             <div className="rolescategory">
             <div className="roles__heading">
               <h2 className="roles__heading-h2">{role && role.rolename} —  {allroleusers && allroleusers.length}</h2> 
            </div>
                {allroleusers && allroleusers.map((myrole)=>{
                    return <Myroles key={myrole.id} myrole={myrole} rolemap={rolemap} color={myrole && myrole.color}/>
                })}
            </div>
        </>
    )
}

export default Rolescategory
