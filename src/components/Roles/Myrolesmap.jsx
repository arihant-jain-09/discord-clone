import React,{useState} from 'react'
import styled from "styled-components"
import { Avatar, makeStyles } from '@material-ui/core'
import { firestore } from '../../firebase/firebase';
import { useSelector } from 'react-redux';

const useStyles=makeStyles({
    avatar:{
        width:'3rem',
        height:'3rem'
    },
    profileavatar:{
        width:'8rem',
        height:'8rem'
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
    display:'inline-block'
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
        }}>
            {open && <div className="roleprofile">
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
               }
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
