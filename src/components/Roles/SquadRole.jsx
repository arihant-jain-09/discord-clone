import React from 'react'
import { Avatar} from '@material-ui/core'

function SquadRole({usr,classes}) {
    return (
        <>
            <div className="roles__box">
                <div className="roles__box-avatar">
                    <Avatar className={classes.avatar} src={usr.userphoto && usr.userphoto}/>
                </div>
                <div className="roles__content">
                    <div className="roles__content-name">
                        <p className='roles__content--squad'>{usr.username && usr.username}</p>
                    </div>
                    <div className='roles__content-status'>
                        {/* Visual Studio Code */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SquadRole
