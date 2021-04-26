import React,{useState} from 'react'
import styled from "styled-components"
import Popper from '@material-ui/core/Popper';
import { Avatar, makeStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { firestore } from '../../firebase/firebase';
import { useSelector } from 'react-redux';

const useStyles=makeStyles({
    avatar:{
        width:'3rem',
        height:'3rem'
    },
    profileavatar:{
        width:'7.5rem',
        height:'7.5rem'
    },
    outlined:(rolearr)=>({
        color:rolearr.map((a)=>{
            return a['color']
        })
    }),

})

const Para=styled.p`
    color:${props=>props.color}
`
const StyledCircle=styled.svg`
    width:'100px'
`
const StyledChip=styled.div`
    border-color:${props=>props.color}
`

const Myrolesmap = ({user,color}) => {
    const [open,setopen]=useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [rolearr,setrolearr]=useState([]);
    const userref=firestore.collection('users');
    const currentserverid=useSelector((state)=>state.currentserver.id)
    const classes=useStyles(rolearr);
     const getuserdata=()=>{
        userref.get().then((snapshot)=>snapshot.docs.forEach((doc)=>{
            if(doc.data().userphoto===user.photoURL){
              const keys = Object.keys(doc.data().roles);
              for(const k of keys){
                if(currentserverid && k===currentserverid){
                     const mykeys=Object.keys(doc.data().roles[k])
                     let arr=[];
                     mykeys.map((rol)=>{
                        arr.push(doc.data().roles[k][rol]);                        
                     })
                     setrolearr(arr);    
                }
              }
            }
          }))
     }

    const handleClick=(event)=>{
    getuserdata()
    setopen(!open);
    setrolearr([]);
    setAnchorEl(anchorEl ? null : event.currentTarget);
}
    return (
        <div onClick={handleClick} onMouseLeave={()=>{
            setopen(false)
            setAnchorEl(null)
        }}>
        {open && <Popper open={open} anchorEl={anchorEl} placement='left' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
              
            <Paper>
              {/* <Typography className={classes.typography}>{user.username && user.username}</Typography> */}
              <div className="roleprofile">
                  <div className="roleprofile__header">
                    <div className="roleprofile__header-photo">
                        <Avatar src={user.photoURL && user.photoURL} className={classes.profileavatar} />
                    </div>
                    <div className="roleprofile__header-username">
                        {user.username && user.username}
                    </div>
                    <div className="roleprofile__header-status">
                        🙌 my website
                    </div>
                  </div>
                  <div className="roleprofile__content">
                    <div className="roleprofile__content-heading">
                        ROLES
                    </div>
                    <div className="roleprofile__content-roles">
                        {rolearr && rolearr.map((a,index)=>{
                            return <StyledChip key={index} className="chip" color={a['color']}>
                            <div className="chip__avatar">
                                <StyledCircle viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill={a['color']} /></StyledCircle>
                            </div>
                            <div className="chip__label" color={a['color']}>
                                {a['yourrole']}
                            </div>
                        </StyledChip>
                        })}
                    </div>
                  </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>}
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
        </div>
    )
}

export default Myrolesmap
