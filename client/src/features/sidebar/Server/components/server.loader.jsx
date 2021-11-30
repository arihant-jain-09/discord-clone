import React from "react"
import ContentLoader from "react-content-loader"

const ServerLoader = (props) => {
  return(
    <>
      <ContentLoader 
      speed={1.25}
      width={72}
      height={600}
      // viewBox="0 0 72 124"
      // backgroundColor="#b4b5b6"
      backgroundColor="#2f3134"
      foregroundColor="#72767d"
      {...props}
    >
      {new Array(12).fill(" ").map((_, i) => {
        return (
          <>
            <circle cx="37" cy={i*65+35} r="29" /> 
            <rect x="-2" y={i*65+29} rx="19" ry="19" width="8" height="16" />
          </>
        );
      })}
      
    </ContentLoader>
    </>
  )
}

export default ServerLoader