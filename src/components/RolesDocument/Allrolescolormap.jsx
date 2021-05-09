import React from 'react'
import styled from "styled-components"
const Color=styled.div`
    background: ${props => props.color};
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
`
const Allrolescolormap = ({k,rol}) => {
    return (
        <div className='allrolescolor'>  
        {rol && rol[k].color && <>
        <Color className="allrolescolor__rolevalue" color={rol[k].color} />
        <div className="allrolescolor__rolename">
            <p>: <span className='allrolescolor__rolename-span'>{k}</span></p>
        </div>
        </>
        }
        </div>
    )
}

export default Allrolescolormap
