import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, firestore } from '../../firebase/firebase';
import currentserver from '../../redux/server/server.actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './AvailableServers.scss'
import { Dialog, makeStyles, withStyles } from '@material-ui/core';
import ChangeServername from './Changeservername'
import newserver from '../../redux/newserver/newserver.actions'
import firebase from 'firebase/app'
import AddNewRole from '../AddNewRole/AddNewRole';
const useStyles=makeStyles({
    paper: { 
        minWidth: '25%',
    },
})
function AvailableServersmap({server}) {
    const classes=useStyles();
    const initialState = {
        mouseX: null,
        mouseY: null,
      };
      const [state, setState] = useState(initialState);

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };      
    const dispatch = useDispatch();
    const id=useSelector((state)=>state.currentserver.id)
    const myserver=server;

    const handleDelete=async(server)=>{
        setState(initialState);
        dispatch((newserver({present:false})));
        if(server.email===auth.currentUser.email){
            const serverRef=firestore.collection('servers').doc(server.id);
            await serverRef.get().then(async(snapshot)=>{
              const roleref=firestore.collection('roles').doc(snapshot.data().roleid)
              await roleref.delete();
            })            
            await serverRef.delete();
            const userref=firestore.collection('users');
            await userref.get().then((snapshot)=>snapshot.docs.forEach((doc)=>{
              if(doc.data().useruid===auth.currentUser.uid){
                const keys = Object.keys(doc.data().roles);
                for(const k of keys){
                  if(k===server.id){
                    userref.doc(doc.id).set({
                      roles:{
                        [k]:firebase.firestore.FieldValue.delete()
                      }
                    },{ merge: true })            
                  }
                }
              }
            }))
        }
        else{
          return
        }
    }
    const handlechangeserver=(server)=>{
        dispatch((currentserver({
            id:server.id,
            name:server.servername,
            email:server.email,
            roleid:server.roleid
        })))
        setState(initialState);
    }
    
    const [open,setopen]=useState(false);
    const [role,setrole]=useState(false);
    const handleChangenickname=()=>{
        if(myserver.email===auth.currentUser.email)
        {
            dispatch((currentserver({
                id:server.id,
                name:server.servername,
                email:server.email
            })))
            setopen(true);
        }
        handleClose();
    }
    const handleAddroles=()=>{
      if(myserver.email===auth.currentUser.email)
        {
          setrole(true);

        }
        dispatch((currentserver({
          id:myserver.id,
          name:myserver.servername,
          email:myserver.email,
          roleid:myserver.roleid
      })))
        handleClose();
    }
    const handledialogactions=()=>{
        setopen(false);
    }
   
    const StyledMenu = withStyles({
        paper: {
          backgroundColor:'#18191c',
          color:'#b9bbbe',
          padding: '6px 8px',
        },
      })((props) => (
        <Menu  
        anchorReference="anchorPosition"
        anchorPosition={
        state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }{...props}/>
      ));
    const StyledMenuItem = withStyles((theme) => ({
        root: {
            fontSize:'1.4rem',
            '&:first-child':{
                backgroundColor:'#5c6fb1',
                color:'#fff'
            },
            '&:last-child':{
                color:'rgb(240, 71, 71)'
            },
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
              fontSize:'1.4rem'
            },
          },
        },
      }))(MenuItem);

    return (
        <div className='availableserver__map'>
            <img key={server.id} onContextMenu={handleClick} style={{ cursor: 'context-menu' }} onClick={()=>{
                 dispatch(currentserver({id:server.id,name:server.servername,email:server.email,roleid:server.roleid}))
                }}
                className={`${id===server.id && `availableserver__map-clicked`} availableserver__map-image`}
                src={server.serverimage} alt="availableserver"
                >
                </img>
                
                <StyledMenu keepMounted open={state.mouseY !== null} onClose={handleClose}>
                    <StyledMenuItem onClick={()=>handlechangeserver(server)}>{server.servername}</StyledMenuItem>
                    <StyledMenuItem onClick={handleChangenickname}>Change Nickname</StyledMenuItem>
                    <StyledMenuItem onClick={handleAddroles}>Add roles</StyledMenuItem>
                    <StyledMenuItem onClick={()=>handleDelete(server)}>Delete Server</StyledMenuItem>
                </StyledMenu>
                {open && <Dialog open={open} onClose={()=>setopen(false)} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper}} >
                    <ChangeServername handleClose={handledialogactions}/>
                </Dialog>}
                {role && <Dialog open={role} onClose={()=>setrole(false)} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper}} >
                    <AddNewRole handleClose={()=>setrole(false)}/>
                </Dialog>}
        </div>
    )
}

export default AvailableServersmap
