import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles, Typography } from '@material-ui/core';
import {auth, firestore} from '../../firebase/firebase'
import firebase from 'firebase/app'
import './AddChannelPopup.scss' 
import { useSelector } from 'react-redux';
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            padding:theme.spacing(1),
            color:'#fff'
        },
        typo:{
            color:'#fcfdfe',
            textTransform:'uppercase',
        },
        dialog:{
            backgroundColor:'#363940',
        },
        dialogaction:{
            backgroundColor:'#363940',
            padding:'4% 6.5%',
        },
        paper: { 
            minWidth: '25%',
        },
    }
})
export default function AddChannelPopup() {
    const classes=useStyles();
  const [open, setOpen] = React.useState(false);
    const [formValue,setformValue]=useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    await channelRef.add({
        channel:formValue,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        // name:auth.currentUser.displayName,
        email:auth.currentUser.email,
        // uid:auth.currentUser.uid,
    })
    .then(
      ()=>{
        console.log("Document Added")
      })
    .catch((error)=>{console.log(error)})

    setformValue('');
  }
  const currentserverid=useSelector((state)=>state.currentserver.id)
  const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
  return (
    <div>
        <svg onClick={handleClickOpen} style={{cursor:'pointer'}}aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">
            <polygon fillRule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
        </svg>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper}}>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
            <Typography variant='h5' className={classes.typo}>Channel name</Typography>
          </DialogContentText>
          <input type="text" required className='input' autoFocus placeholder='Type channel name' onChange={(e)=>setformValue(e.target.value)} value={formValue}/>
        </DialogContent>
        <DialogActions className={classes.dialogaction}>
            <form onSubmit={handleSubmit} className='form'>
              <button type='submit' onClick={handleClose} className='form__button'>Add</button>
            </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}
