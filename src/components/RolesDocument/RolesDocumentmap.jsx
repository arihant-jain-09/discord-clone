import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase'
import Allrolescolormap from './Allrolescolormap';
import Allrolesmap from './Allrolesmap';

const RolesDocumentmap = ({role,roledoc}) => {
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const serverRef=firestore.collection('servers').doc(currentserverid);
    const allrolesRef=firestore.collection('roles').doc(roledoc).collection('rolemenu').doc(role.id).collection('allroles');
    // const query=allrolesRef.orderBy('createdAt').limit(10);
    const [allroles]=useCollectionData(allrolesRef,{idField:'id'});
    const handleclick=async(obj)=>{
        console.log(obj);
        const {rolename,id,email,photoURL,number,color}=obj
        const roleref=allrolesRef.doc(id);
        await roleref.update({
           [rolename]:{
               number:number+1,
               color:color
           }
        })
        await serverRef.set({
            allroles:{
                [rolename]:{
                    user:{
                        email:email,
                        photoURL:photoURL
                    }
                }
            }, merge: true
        })
        
    }
    return (
        <>
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
                                <p>Role Menu: {role.roleheading}</p>
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
                                    console.log(rol);
                                    return(
                                        keys.map((k,index)=>{
                                        return <Allrolesmap key={index} rol={rol} k={k} handleClick={handleclick}/>
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