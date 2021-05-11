import React, { useState } from 'react';
import {Avatar,Badge} from '@material-ui/core';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import {IconButton} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import './BadgeAvatar.scss'
import { useHistory } from 'react-router';
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles=makeStyles((theme)=>{
  return{
    settings:{
      display:'flex',
      flexWrap:'wrap'
    },
    icon:{
      padding:'.5rem',
      color:'#babbbf'
    },
    avatar:{
      width:'3.25rem',
      height:'3.25rem'
    }
  }
})

export default function BadgeAvatars() {
  const history=useHistory();
  const [user]=useAuthState(auth);
  const [mic,setmic]=useState(false);
  const classes=useStyles();
  const handleClick=async ()=>{
    await auth.signOut();
    history.push('/discord-clone');
  }
    return (
    <div>
      <div className="profile">
        <div className="profile__avatar">
          <StyledBadge overlap="circle" anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} variant="dot">
            <Avatar alt="Remy Sharp" src={`${user&& user.photoURL?user.photoURL:null}`} className={classes.avatar}/>
          </StyledBadge>
          <div className="profile__name">
            <div className="profile__name-name">
              {`${user&& user.displayName?user.displayName:null}`}
            </div>
            <div className="profile__name-uid">
              #{user && user.uid.slice(0,6)}
            </div>
          </div>
        </div>
        <div className={classes.settings}>
            <IconButton className={classes.icon} onClick={()=>setmic(!mic)} aria-label="settings">
              {mic?<MicIcon fontSize='large'/>: <MicOffIcon fontSize='large' />}
            </IconButton>
            <IconButton className={classes.icon} aria-label="settings">
            <HeadsetMicIcon fontSize='large'/>
            </IconButton>
            <IconButton className={classes.icon} aria-label="settings" onClick={handleClick}>
              <SettingsIcon fontSize='large' />
            </IconButton>
        </div>
      </div>
      
    </div>
  );
}