import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase'
import Allrolescolormap from './Allrolescolormap';
import Allrolesmap from './Allrolesmap';
import firebase from 'firebase/app'
import { Avatar, makeStyles } from '@material-ui/core';
const useStyles=makeStyles((theme)=>{
    return{
      avatar:{
          width:theme.spacing(4.5),
          height:theme.spacing(4.5)
      }
    }
})
const RolesDocumentmap = ({role,roledoc}) => {
    const classes=useStyles();
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const allrolesRef=firestore.collection('roles').doc(roledoc).collection('rolemenu').doc(role.id).collection('allroles');
    // const query=allrolesRef.orderBy('createdAt').limit(10);
    const [allroles]=useCollectionData(allrolesRef,{idField:'id'});
    const [count,setcount]=useState(0);
    const handleclick=async(obj)=>{
        setcount(count+1);
        if(count>0){
            return
        }
        const {rolename,id,email,photoURL,name,serverroleid,serverroletypeid}=obj
        const serverRef=firestore.collection('servers').doc(currentserverid).collection('allroles').doc(serverroletypeid).collection('allroles').doc(serverroleid).collection('allusers');
        await serverRef.add({
            username:name,
            photoURL:photoURL,
            email:email,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        })

        const roleref=allrolesRef.doc(id);
        await roleref.update({
            [`${rolename}.number`]:firebase.firestore.FieldValue.increment(1),
        })
        
        // [`favorites.${key}.color`]
        // await serverRef.set({
        //     // [`allroles.${rolename}.user.email`]:email,
        //     // [`allroles.${rolename}.user.photoURL`]:photoURL,
        //     allroles:{
        //         [rolename]:{
        //             user:[{
        //                 email:email,
        //                 photoURL:photoURL
        //             }]
        //         }
        //     },
        // },{merge: true})
    }
    return (
        <>
        <div className='rolesdocument__header-photo'>
                <Avatar className={classes.avatar} src='./bot.png'/>
        </div>
            <div className="rolesdocument__content">
                        <div className="rolesdocument__content-header">
                            <div className='rolesdocument__content-name'>
                                Discord Bot
                            </div>
                            <div className="rolesdocument__content-date">
                                {`${role.createdAt && 
                                    role.createdAt.toDate().getDate()+"/"+(role.createdAt.toDate().getMonth()+1)+"/"+role.createdAt.toDate().getFullYear()
                                    }`}
                            </div>
                        </div>
                        <div className="rolesdocument__message">
                            <div className="rolesdocument__message-rolemenu">
                                <p>Role Menu: {role.rolename}</p>
                            </div>
                            <div className="rolesdocument__message-react">
                                React to give yourself a role.
                            </div>
                            <div className="rolesdocument__message-allroles">
                                {allroles && allroles.map((rol,i)=>{
                                    const keys = Object.keys(rol);
                                    return(
                                       <div key={i}>{ keys.map((k,index)=>{
                                        return (
                                            <Allrolescolormap key={index} rol={rol} k={k}/>
                                        )
                                    })}</div>
                                    )                                    
                                })}
                            </div>
                            <div className="rolesdocument__message-rolebuttons">
                            {allroles && allroles.map((rol)=>{
                                    const keys = Object.keys(rol);
                                    return(
                                        keys.map((k,index)=>{
                                        return <Allrolesmap key={index} rol={rol} k={k} handleClick={handleclick} roleheading={role.rolename} roleheadid={role.serverroletypeid}/>
                                    })
                                    )                                    
                                })}
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default RolesDocumentmap
// console.log(k,rol[k]);
// console.log(keys);
                                    // for(const myrole in rol){
                                    //    console.log(rol[myrole]);
                                    // }