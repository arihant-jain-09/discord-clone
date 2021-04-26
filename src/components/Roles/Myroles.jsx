import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Myrolesmap from './Myrolesmap'

const Myroles = ({myrole,color,rolemap}) => {
    const allusersref=rolemap.doc(myrole.id).collection('allusers');
    const [allusers]=useCollectionData(allusersref,{idField:'id'});
    return (
        <div className='myroles'>
            <div className="myroles__user">
                {allusers && allusers.map((user)=>{
                return <Myrolesmap key={user.id} user={user} color={color}/>
                })}
            </div>
        </div>
    )
}

export default Myroles
