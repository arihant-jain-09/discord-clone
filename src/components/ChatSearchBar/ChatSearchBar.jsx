import React from 'react'
import './ChatSearchBar.scss'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { IconButton,makeStyles } from '@material-ui/core';
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            color: '#b8bbc0',
            padding:'1.25rem .75rem'
        },
        addbutton:{
            backgroundColor:'#40454b',
            color:'#b8bbc0',
            padding:'.9rem 1rem',
            '&:hover':{
                backgroundColor:'#40454b'
            }
        }
    }
})
function ChatSearchBar() {
    const classes=useStyles();
    return (
        <div>
            <div className="chatsearchbar">
                <div className="chatsearchbar__addicon">
                    <IconButton className={classes.addbutton} aria-label="settings">
                        <AddCircleOutlineIcon fontSize='large'/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__input">
                    <input className='chatsearchbar__input-text' placeholder='Message #code-runner' type="text"/>
                </div>
                <div className="chatsearchbar__gifticon">
                    <IconButton className={classes.button} aria-label="settings">
                        <CardGiftcardIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__gifcon">
                    <IconButton className={classes.button} aria-label="settings">
                        <GifIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
                <div className="chatsearchbar__emojiicon">
                    <IconButton className={classes.button} aria-label="settings">
                        <InsertEmoticonIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ChatSearchBar
