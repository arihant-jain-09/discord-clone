import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, firestore } from '../../firebase/firebase';
import currentserver, { deleteServer } from '../../redux/server/server.actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './AvailableServers.scss'
import { Dialog, makeStyles, withStyles } from '@material-ui/core';
import ChangeServername from './Changeservername'
// import newserver from '../../redux/newserver/newserver.actions'
// import firebase from 'firebase/app'
import AddNewRole from '../AddNewRole/AddNewRole';
import { useHistory } from 'react-router';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const useStyles=makeStyles({
    paper: { 
        minWidth: '25%',
    },
})
function AvailableServersmap({server}) {
  const history=useHistory();
  const channelRef=firestore.collection('servers').doc(server.id).collection('channels');
  const query=channelRef.orderBy('createdAt').limit(1);
  const [channels]=useCollectionData(query,{idField:'id'});
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

    // const handleDelete=async(server)=>{
    //     setState(initialState);
    //     dispatch(deleteServer(server));
    //     dispatch((newserver({present:false})));
    //     if(server.email===auth.currentUser.email){
    //         const serverRef=firestore.collection('servers').doc(server.id);
    //         const roleref=firestore.collection('roles').doc(server.id);
    //         await roleref.delete();        
    //         await serverRef.delete();
    //         const userref=firestore.collection('users');
    //         userref.doc(auth.currentUser.uid).set({
    //           roles:{
    //             [auth.currentUser.uid]:firebase.firestore.FieldValue.delete()
    //           }
    //         },{ merge: true })  
    //     }
    //     else{
    //       return
    //     }
    // }
    const handlechangeserver=(server)=>{
      history.push(`/channels/${server.id}/${channels[0].id}`);
        dispatch((currentserver({
            id:server.id,
            name:server.servername,
            email:server.email,
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

      const ChangeServer=()=>{
        dispatch(currentserver({id:server.id,name:server.servername,email:server.email}));
        //  await channelRef.orderBy('createdAt').limit(1).get().then((snapshot)=>{
              //    snapshot.docs.map(async(channel)=>{
              //     dispatch(currentserver({id:server.id,name:server.servername,email:server.email}))
              //     history.push(`/discord-clone/channels/${server.id}/${channel.id}`);
              //    })
              //  })
              if(channels && !!channels.length)
              history.push(`/discord-clone/channels/${server.id}/${channels[0].id}`);               
            }

    return (
        <div className={`${id===server.id?'availableserver__clicked':'availableserver__map'}`}>
          {server.serverimage ? <img key={server.id} onContextMenu={handleClick} style={{ cursor: 'context-menu' }} onClick={ChangeServer}
                className={`${id===server.id && 'availableserver__clicked-imageuniversal'} availableserver__map-imageuniversal`}
                src={server.serverimage} alt="availableserver"
                />:<div className='availableserver__map-text' onClick={ChangeServer} onContextMenu={handleClick} style={{ cursor: 'context-menu' }} >
                    {server.servername.slice(0,1)}
                  </div>}
            
                
                <StyledMenu keepMounted open={state.mouseY !== null} onClose={handleClose}>
                    <StyledMenuItem onClick={()=>handlechangeserver(server)}>{server.servername}</StyledMenuItem>
                    <StyledMenuItem onClick={handleChangenickname}>Change Nickname</StyledMenuItem>
                    <StyledMenuItem onClick={handleAddroles}>Add roles</StyledMenuItem>
                    <StyledMenuItem onClick={()=>{
                      setState(initialState);
                      dispatch(deleteServer(server));
                      history.push('/discord-clone/channels/@me');
                    }}>Delete Server</StyledMenuItem>
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
