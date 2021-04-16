import { Avatar } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core'
const useStyles=makeStyles((theme)=>{
    return{
        // avatar:{
        //     padding:"20px"
        // }
    }
})
 const Chatmessagemap=({msg})=> {
    const classes=useStyles();
     return (
        <div>
            <div className="chatmessage">
                <div className="chatmessage__header">
                    <div className="chatmessage__header-photo">
                        <Avatar className={classes.avatar} src={`${msg && msg.senderphoto}`}/>
                    </div>
                    <div className="chatmessage__content">
                        <div className="chatmessage__content-header">
                            <div className="chatmessage__content-name">
                                {`${msg && msg.sendername}`}
                            </div>
                            <div className="chatmessage__content-date">
                                {`${msg.createdAt && 
                                    msg.createdAt.toDate().getDate()+"/"+(msg.createdAt.toDate().getMonth()+1)+"/"+msg.createdAt.toDate().getFullYear()
                                    }`}
                            </div>
                        </div>
                        <div className="chatmessage__message">
                        {`${msg && msg.message}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatmessagemap
