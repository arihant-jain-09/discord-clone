import React, { useEffect, useState } from 'react'
function RenderVideo({msg}) {
    const [clicked,setclicked]=useState(false);
    const [data,setdata]=useState('');
    useEffect(() => {
        if(msg){
            fetch(`https://www.youtube.com/oembed?url=${msg}&maxwidth=400&maxheight=225&format=json`)
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
            // throw response
        }
        ).then((results)=>setdata(results))
        }
        return () => {
            
        }
    }, [msg])
    // console.log(data && data.html.split('src="')[1].split('"')[0]+"&autoplay=1&amp;auto_play=1");
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
                <div className="rendervideo__video">
                    {!clicked ? <>
                        <div className="rendervideo__video-image">
                            <img src={data.thumbnail_url} alt={data.author_name} />
                        </div>
                        <div className="rendervideo__video-container">
                            <div className="rendervideo__video-load" onClick={()=>setclicked(!clicked)}>
                                <svg className="iconPlay-2kgvwV icon-3ZFEtL" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                    <polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon>
                                </svg>
                            </div>
                            <a href={msg} target="_blank" rel="noreferrer" className="rendervideo__video-openurl">
                                <svg className="iconExternalMargins-2v2mzg icon-3ZFEtL" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="currentColor" transform="translate(3.000000, 4.000000)" d="M16 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-2H2V4h14v10h-4v2h4c1.1 0 2-.9 2-2V2a2 2 0 0 0-2-2zM9 6l-4 4h3v6h2v-6h3L9 6z"></path>
                                </svg>
                            </a>
                        </div>
                    </>:data && <iframe className='rendervideo__videocontainer__video' 
                src={data && data.html.split('src="')[1].split('"')[0]+"&autoplay=1&amp;auto_play=1"} width="400" height="225" title="YouTube video player" frameBorder="0" 
                allowFullScreen="" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-presentation"></iframe>}
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default RenderVideo
/* {videoId() && <iframe className='rendervideo__videocontainer__video' 
                src={`https://www.youtube.com/embed/${videoId()}`} title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> } */
// console.log("https://www.youtube.com/watch?v=eVuPhZl4ksY&list=RDMM&index=4".split("v=")[1].split("&")[0]);
/* {linkify(msg) && videoId && <ReactPlayer url={linkify(msg).filter((item)=>item.includes('youtube.com/watch')&&item)}/> } */
/* DOMPurify.sanitize(data.html,{ ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen','autoplay','frameborder', 'scrolling']}) */

