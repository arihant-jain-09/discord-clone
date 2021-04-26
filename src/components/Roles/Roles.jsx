import React, { useEffect } from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebase';
import { Avatar, makeStyles } from '@material-ui/core'
import './Roles.scss'
import SquadRole from './SquadRole';
import { useDispatch, useSelector } from 'react-redux';
import currentrole from '../../redux/roles/roles.actions';
import Rolescategory from './Rolescategory';
const useStyles=makeStyles({
    avatar:{
        width:'3rem',
        height:'3rem'
    },
})
function Roles() {
    const classes=useStyles();
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const serverRef=firestore.collection('servers').doc(currentserverid);
    const [servers]=useDocumentData(serverRef);
    // const userRef=firestore.collection('users');
    // const query=userRef.orderBy('createdAt');
    // const [allusers]=useCollectionData(query,{idField:'id'});
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(currentrole({admin:servers}));
        return () => {
           
        }
    }, [servers,dispatch])

    const allrolesref=serverRef.collection('allroles');
    const rolequery=allrolesref.orderBy('createdAt');
    const [allroles]=useCollectionData(rolequery,{idField:'id'});
    
    return (
        <div className='roles'>
            <div className="roles__heading">
               <h2 className="roles__heading-h2">Administrator  —  1</h2> 
            </div>
            <div className="roles__box">
                <div className="roles__box-avatar">
                    <Avatar className={classes.avatar} src={servers && servers.userimage && servers.userimage}/>
                </div>
                <div className="roles__content">
                    <div className="roles__content-name">
                        <p className='roles__content--admin'>{servers && servers.admin && servers.admin}</p>
                    </div>
                    <div className='roles__content-status'>
                        Visual Studio Code
                    </div>
                </div>
            </div>
            {/* <div className="roles__heading">
               <h2 className="roles__heading-h2">Squad  —  {allusers && allusers.length}</h2> 
            </div> */}
            {allroles && allroles.map((role)=>{
                return <Rolescategory key={role.id} role={role}/>
            })}

            {/* {allusers && allusers.map((usr)=>{
                if(usr && servers && usr.useremail===servers.email){
                   
                }
                else{
                    return <SquadRole key={usr.id} usr={usr} classes={classes} />
                }
            })} */}
        </div>
    )
}

export default Roles
