import React, { useEffect, useState } from 'react'
function RenderVideo({msg}) {
    const [data,setdata]=useState('');
    useEffect(() => {
        fetch(`https://www.youtube.com/oembed?url=${msg}&maxwidth=400&maxheight=225&format=json`)
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
            throw response.ok
        }
        ).then((results)=>setdata(results))
        .catch((error)=>console.log(error))
        return () => {
            
        }
    }, [msg])

    // const videoId=()=>{
    //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //     const match = msg.match(regExp);
    
    //     return (match && match[2].length === 11)
    //       ? match[2]
    //       : null;
    // }
    
    return (
        <>
        {data && <div className='rendervideo'>
            <div className="rendervideo__videocontainer">
                <a href={data.provider_url} target="_blank" rel="noreferrer" className="rendervideo__videocontainer-providerlink"><div className="rendervideo__videocontainer-providername">YouTube</div></a>
                <a href={data.author_url} target="_blank" rel="noreferrer" className="rendervideo__videocontainer-authorurl">
                    <p className="rendervideo__videocontainer-authorname">{data.author_name}</p>
                </a>
                <a href={msg} target="_blank" rel="noreferrer" className="rendervideo__videocontainer-title">
                    <div className="rendervideo__videocontainer-titlename">{data.title && data.title.length<66?data.title:data.title.slice(0,66)+"..."}</div>
                </a>
                {data && <div dangerouslySetInnerHTML={{ __html: data.html }}/>}
                {/* {videoId() && <iframe className='rendervideo__videocontainer-video' 
                src={`https://www.youtube.com/embed/${videoId()}`} title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> } */}
            </div>
        </div>
        }
        </>
    )
}

export default RenderVideo
// console.log("https://www.youtube.com/watch?v=eVuPhZl4ksY&list=RDMM&index=4".split("v=")[1].split("&")[0]);
/* {linkify(msg) && videoId && <ReactPlayer url={linkify(msg).filter((item)=>item.includes('youtube.com/watch')&&item)}/> } */