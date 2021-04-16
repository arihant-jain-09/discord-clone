import React from 'react'
import './ChatHeader.scss'
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import { fade, IconButton,InputBase,makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            color:'#babbbd',
            padding:'.8rem'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#212226',
            '&:hover': {
              backgroundColor: fade('#212226', 0.5),
            },
            marginLeft: 0,
            marginRight:theme.spacing(.4),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(1),
              width: 'auto',
            },
          },
          searchIcon: {
            padding: theme.spacing(0, 1.5),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color:'#363940'
          },
          inputRoot: {
            color: 'inherit',
          },
          inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            fontSize:theme.spacing(1.5),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              width: '12ch',
              '&:focus': {
                width: '20ch',
              },
            },
          },
    }
})
function ChatHeader() {
    const classes=useStyles();
    return (
        <div className="chat__main">
            <div className="chatheader">
                <div className="chatheader__topic">
                    <p className='chatheader__topic-hash'>#</p>
                    <p className="chatheader__topic-content">{useSelector((state)=>state.doc.name)}</p>
                </div>
                <div className="chatheader__items">
                    <div className='chatheader__items-left'>
                        <IconButton className={classes.button} aria-label="settings">
                            <NotificationsIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className={classes.button} aria-label="settings">
                            <EditLocationIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className={classes.button} aria-label="settings">
                            <PeopleIcon fontSize='large'/>
                        </IconButton>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                        <div className="chatheader__items-right">
                        <IconButton className={classes.button} aria-label="settings">
                            <InboxIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className={classes.button} aria-label="settings">
                            <HelpIcon fontSize='large'/>
                        </IconButton>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default ChatHeader
