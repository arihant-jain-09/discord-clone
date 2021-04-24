import React, { useState } from 'react'
import styled from "styled-components"
import { auth, firestore} from '../../firebase/firebase'
import firebase from 'firebase/app'
import {useCollectionData} from 'react-firebase-hooks/firestore';
const Color=styled.div`
    background: ${props => props.color};
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
`
const Allrolesmap = ({rol,k,handleClick,roleheadid,roleheading}) => {
    // const currentserverid=useSelector((state)=>state.currentserver.id);
    // const checkserverRef=firestore.collection('servers').doc(currentserverid).collection('allroles').doc(roleheadid).collection('allroles');
    // // const [currentusercheck]=useCollectionData()
    // // console.log(rol[k].serverroleid);
    // const allusersref=firestore.collection('users');
    // const [allusers]=useCollectionData(allusersref);
    // if(allusers){
    //     allusers.map((usr)=>{
    //            if(usr && usr.roles){
    //             const keys = Object.keys(usr.roles);
    //             keys.map((myk)=>{
    //                 if(myk===roleheading){
    //                     console.log(myk);
    //                 }
    //             })
    //            }
    //     }
    //     )
    // }

    // const handleUser=async()=>{
    //     // const {rolename,id,email,photoURL,name,serverroleid,serverroletypeid}=obj
    //     const serverRef=firestore.collection('servers').doc(currentserverid).collection('allroles').doc(serverroletypeid).collection('allroles').doc(serverroleid).collection('allusers');
    //     await serverRef.add({
    //         username:name,
    //         photoURL:photoURL,
    //         email:email,
    //         createdAt:firebase.firestore.FieldValue.serverTimestamp(),
    //     })

    //     const roleref=allrolesRef.doc(id);
    //     await roleref.update({
    //         [`${rolename}.number`]:firebase.firestore.FieldValue.increment(1),
    //     })
    // }
    return (
        <div onClick={()=>handleClick({
            photoURL:auth.currentUser.photoURL,
            email:auth.currentUser.email,
            id:rol.id,
            rolename:k,
            number:rol[k].number,
            color:rol[k].color,
            name:auth.currentUser.displayName,
            serverroletypeid:roleheadid,
            serverroleid:rol[k].serverroleid
        })}>
            
            {rol && rol[k].number &&<div className='allroles'>
            <div className="allroles__button">
                <Color className="allrolescolor__rolevalue" color={rol[k].color} />
            </div>
            <div className="allroles__number">
                {rol[k].number}
            </div>
            
            </div>}
            {/* {console.log(rol)} */}
        </div>
    )
}

export default Allrolesmap
