import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Myrolesmap from './Myrolesmap'

const Myroles = ({myrole,classes,color,rolemap}) => {
    const allusersref=rolemap.doc(myrole.id).collection('allusers');
    const [allusers]=useCollectionData(allusersref,{idField:'id'});
    return (
        <>
        {allusers && allusers.map((user)=>{
            return <Myrolesmap key={user.id} user={user} classes={classes} color={color}/>
        })}
             
        </>
    )
}

export default Myroles
