// import React, { useState } from 'react'
// import AddIcon from '@material-ui/icons/AddCircle';
// import { Container, DialogActions, DialogContent, DialogContentText, IconButton, makeStyles, Typography } from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';
// import PhotoIcon from '@material-ui/icons/Photo';
// import Resizer from "react-image-file-resizer";
// import './AddNewRole.scss'
// import { auth, firestore } from '../../firebase/firebase';
// import firebase from 'firebase/app'
// import { useDispatch, useSelector } from 'react-redux';
// import currentserver from '../../redux/server/server.actions';
// const useStyles=makeStyles({
//     addicon:{
//         width:'4.8rem',
//         height:'4.8rem',
//         color:'#43b581'
//     },
//     header:{
//         textAlign:'center'
//     },
//     header__heading:{
//         fontSize:'2rem',
//         color:'#060607',
//         padding:'.3rem 2rem',
//         fontFamily:'Whitney-bold',
//         display:'block'
//     },
//     header__text:{
//         fontSize:'1.5rem',
//         display:'block'
//     },
//     header__rolename:{
//         marginRight:'80%',
//         color:'#6a7480',
//         fontSize:'1.25rem',
//         fontFamily:'Whitney-medium'
//     },
//     roleheader:{
//         margin:'.6rem 2rem',
//     },
//     roleheader__rolecolor:{
//         color:'#6a7480',
//         fontSize:'1.25rem',
//         fontFamily:'Whitney-medium'
//     },
//     dialogcontent:{
//         backgroundColor:'#fff',
//     },
//     dialogaction:{
//         backgroundColor:'#f6f6f7',
//         padding:'4% 5% 4% 5%',
//     },
//     paper: { 
//         minWidth: '25%',
//     },
//     input:{
//         display:'none'
//     },
// })
// function Addnewrole({handleClose}) {
//     const classes=useStyles();
//     const [formValue,setformValue]=useState({
//         color:'#fff',
//         rolename:''
//     });
//     const currentserverid=useSelector((state)=>state.currentserver.id);
//     const roleid=useSelector((state)=>state.currentserver.roleid);
//     const serverRef=firestore.collection('servers').doc(currentserverid).collection('allroles');
//     const roleRef=firestore.collection('roles').doc(roleid).collection('rolemenu');
//     // const dispatch = useDispatch();        
//       const handleSubmit=async (e)=>{
//         e.preventDefault();
//         if(formValue){
//             await serverRef.add({
//                 color:formValue.color,
//                 createdAt:firebase.firestore.FieldValue.serverTimestamp(),
//                 rolename:formValue.rolename
//             }).then(()=>{

//             })
//             setformValue('');
//         }
//         handleClose();
//       }
//       const handleChange=(e)=>{
//         const {name,value}=e.target;
//         setformValue(()=>{
//             return{
//                 ...formValue,
//                 [name]:value
//             }
//         })
//       }
       
//     return (
//     <div className='Addnewrole'>
//             <DialogContent className={classes.dialogcontent}>
//             <DialogContentText className={classes.header}>
//                     <Typography component={'span'} className={classes.header__heading}>
//                         Add roles
//                     </Typography>
//                     {/* <Typography component={'span'} className={classes.header__text}>
//                         Change your Server Name and icon...
//                     </Typography> */}
//                     <Typography component={'span'} className={classes.header__rolename}>
//                        Role Name
//                     </Typography>                
//             </DialogContentText>
//                 <input type="text" name='rolename' required className='input__content' autoFocus onChange={handleChange} value={formValue.rolename}/>
//                 <DialogContentText className={classes.roleheader}>
//                     <Typography component={'span'} className={classes.roleheader__rolecolor}>
//                         Role Color
//                         </Typography> 
//                     </DialogContentText>
//                 <input type="text" name='color' required className='input__content' onChange={handleChange} value={formValue.color}/>
//             </DialogContent>
            
//             <DialogActions className={classes.dialogaction}>
//             <button type='text' onClick={handleClose} className='Addnewrole__form-back'>Back</button>
//                 <form onSubmit={handleSubmit} className='Addnewrole__form'>
//                     <button type='submit' className='Addnewrole__form-button'>Add</button>
//                 </form>
//             </DialogActions>
//     </div>
//     )
// }

// export default Addnewrole
