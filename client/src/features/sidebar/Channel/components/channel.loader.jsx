import React from "react"
import ContentLoader from "react-content-loader"

const ChannelLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={240}
    height={600}
    backgroundColor="#b4b5b6"
    foregroundColor="#72767d"
    {...props}
  >
    {new Array(6).fill(" ").map((_, i) => {
        return (
          <>
          <rect x="12.5" y={i*32+14} rx="3" ry="3" width="213" height="20" /> 
          </>
        );
      })}
    
  </ContentLoader>
)

export default ChannelLoader
