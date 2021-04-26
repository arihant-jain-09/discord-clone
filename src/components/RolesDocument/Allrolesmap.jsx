import React from 'react'
import styled from "styled-components"
import { auth} from '../../firebase/firebase'
const Color=styled.div`
    background: ${props => props.color};
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
`
const Allrolesmap = ({rol,k,handleClick,roleheadid}) => {
    return (
        <div onClick={()=>handleClick({
            photoURL:auth.currentUser.photoURL,
            email:auth.currentUser.email,
            id:rol.id,
            rolename:k,
            number:rol[k].number,
            color:rol[k].color,
            name:auth.currentUser.displayName,
            serverroletypeid:roleheadid,
            serverroleid:rol[k].serverroleid
        })}>
            {rol && rol[k].number &&<div className='allroles'>
            <div className="allroles__button">
                <Color className="allrolescolor__rolevalue" color={rol[k].color} />
            </div>
            <div className="allroles__number">
                {rol[k].number}
            </div>
            
            </div>}
        </div>
    )
}

export default Allrolesmap
