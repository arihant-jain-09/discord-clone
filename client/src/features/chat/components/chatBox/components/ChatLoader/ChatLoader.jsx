import React from "react"
import ContentLoader from "react-content-loader"

const ChatLoader = (props) => {
  return (
    <ContentLoader
    speed={1.25}
    height={1200}
    width={1060}
    backgroundColor="#b4b5b6"
    foregroundColor="#72767d"
      {...props}
    >
      {new Array(12).fill(" ").map((_, i) => {
        return (
          <>
            <rect x="48" y={i*48+8} rx="3" ry="3" width="88" height="6" /> 
            <rect x="48" y={i*48+26} rx="3" ry="3" width="410" height="6" /> 
            <circle cx="20" cy={i*52+20} r="20" /> 
          </>
        );
      })}
    
    </ContentLoader>
  )
}

export default ChatLoader