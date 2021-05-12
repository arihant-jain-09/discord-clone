import React, { useState } from 'react'
import { Container, DialogActions, DialogContent, DialogContentText, IconButton, makeStyles, Typography } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo';
import Resizer from "react-image-file-resizer";
import './Changeservername.scss'
import { firestore } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
const useStyles=makeStyles({
    addicon:{
        width:'4.8rem',
        height:'4.8rem',
        color:'#43b581'
    },
    header:{
        textAlign:'center',
    },
    header__heading:{
        fontSize:'2rem',
        color:'#060607',
        padding:'.3rem 2rem',
        fontFamily:'Whitney-bold',
        display:'block'
    },
    header__text:{
        fontSize:'1.5rem',
        display:'block'
    },
    header__servername:{
        marginRight:'75%',
        color:'#6a7480',
        fontSize:'1.25rem',
        fontFamily:'Whitney-medium'
    },
    dialogcontent:{
        backgroundColor:'#fff',
    },
    dialogaction:{
        backgroundColor:'#f6f6f7',
        padding:'4% 5% 4% 5%',
    },
    paper: { 
        minWidth: '25%',
    },
    input:{
        display:'none',
    },
    container:{
        marginTop:'1.5rem'
    }
})
function ChangeServername({handleClose}) {
    const classes=useStyles();
    const [uploadfile,setuploadfile]=useState()
    const [formValue,setformValue]=useState('');
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const serverRef=firestore.collection('servers').doc(currentserverid);
      const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                file,
                100,
                100,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64",
                );
            });
        
      const handleSubmit=async (e)=>{
          console.log('hanlde called');
          handleClose();
        e.preventDefault();

        if(formValue){
            if(uploadfile){
                await serverRef.update({
                     servername:formValue,
                     serverimage:uploadfile
                 })
                 setformValue('');
             }
             else{
                 await serverRef.update({
                     servername:formValue,
                 })
                 setformValue('');
             }
        }
      }
      const handleImageUpload=async(e)=>{
        const encodedimage=await resizeFile(e.target.files[0]);
        setuploadfile(encodedimage);
      }
      
    return (
    <div className='ChangeServername'>
            <DialogContent className={classes.dialogcontent}>
            <DialogContentText component={'div'}className={classes.header}>
                    <Typography component={'span'} className={classes.header__heading}>
                        Customize your server
                    </Typography>

                    <Typography component={'span'} className={classes.header__text}>
                        Change your Server Name and icon...
                    </Typography>
                    <Container className={classes.container} maxWidth="sm">
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleImageUpload} />
                        <label htmlFor="icon-button-file">
                            <IconButton className={classes.iconbutton} color="primary" aria-label="upload picture" component="span">
                                <img className='uploadimage' src="/discord-clone/upload.png" alt=""/>
                            </IconButton>
                        </label>
                        </Container>
                    <Typography component={'span'} className={classes.header__servername}>
                       SERVER NAME
                    </Typography>                
            </DialogContentText>
                <input type="text" placeholder='Change server name' required className='input__content' autoFocus onChange={(e)=>setformValue(e.target.value)} value={formValue}/>
            </DialogContent>
            <DialogActions className={classes.dialogaction}>
            <button type='text' onClick={handleClose} className='ChangeServername__form-back'>Back</button>
                <form onSubmit={handleSubmit} className='ChangeServername__form'>
                    <button type='submit' className='ChangeServername__form-button'>Change</button>
                </form>
            </DialogActions>
    </div>
    )
}

export default ChangeServername
