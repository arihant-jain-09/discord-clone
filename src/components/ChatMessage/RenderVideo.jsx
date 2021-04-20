import React from 'react'
import ReactPlayer from 'react-player/lazy'
function RenderVideo({msg}) {
   
    const linkify=(input)=>{
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return input.match(urlRegex)
    }
    return (
        <div className={`${!!linkify(msg).filter((item)=>item.includes('youtube.com/watch')&&item).length && 'rendervideo__videolink'} rendervideo`}> 
        {linkify(msg) && !!linkify(msg).filter((item)=>item.includes('youtube.com/watch')&&item).length && <ReactPlayer url={linkify(msg).filter((item)=>item.includes('youtube.com/watch')&&item)}/> }
        </div>
    )
}

export default RenderVideo
