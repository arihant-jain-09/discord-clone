import React from 'react'
import styled from "styled-components"
import { Avatar } from '@material-ui/core'
const Para=styled.p`
    color:${props=>props.color}
`
const Myrolesmap = ({classes,user,color}) => {
    return (
        <>
         <div className="roles__box">
                <div className="roles__box-avatar">
                    <Avatar className={classes.avatar} src={user.photoURL && user.photoURL}/>
                </div>
                <div className="roles__content">
                    <div className="roles__content-name">
                        <Para color={color} className='roles__content--squad'>{user.username && user.username}</Para>
                    </div>
                    <div className='roles__content-status'>
                        {user.status && user.status}
                    </div>
                </div>
            </div>   
        </>
    )
}

export default Myrolesmap
