import React from 'react'
// import * as ByteSize from 'byte-size'
function RenderAudio({msg}) {
    // const {audiosize}=msg
    // const bytesize=()=>{
    //     console.log('called');
    //     return `${ByteSize(audiosize)}`;
    // }
    return (
        <div className='renderaudio'>
           <div className="renderaudio__name"> {msg && msg.audioname}</div>
            <div className="renderaudio__mainplayer">
                {/* <div className="renderaudio__player-size">{msg && bytesize()}</div> */}
                <div className="renderaudio__player">
                    <audio
                    className='renderaudio__player-music'
                    controls
                    src={msg.audiourl}
                    preload='metadata'
                    >
                    Your browser does not support the
                    <code>audio</code> element.
                    </audio>
                </div>
            </div>
        </div>
    )
}

export default RenderAudio
