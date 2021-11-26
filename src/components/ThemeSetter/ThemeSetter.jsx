import React, { useContext, useRef } from "react";
import ThemeContext from "../../styles/Theme/ThemeContexts";
import {ReactComponent as Light} from '../../assets/sun.svg'
import {ReactComponent as Dark} from '../../assets/moon.svg'
import './ThemeSetter.scss'
export default function ThemeSetter() {
  const { theme, setTheme } = useContext(ThemeContext);
  const lightRef=useRef(null);
  const darkRef=useRef(null);
  const ChangeTheme=()=>{
    if(theme==='light'){
      setTheme('dark');
      lightRef.current.currentTime = 0;
      lightRef.current.play();
    }
    else {
      darkRef.current.currentTime = 0;
      darkRef.current.play();
      setTheme('light')
    }
  }
  return (
    <>
    <button className="themeSetter" value={theme} onClick={ChangeTheme}>
      {theme==='light' ? <Dark/>:<Light/>}
    </button>
    <audio ref={lightRef} src="audio/light-on.mp3" className="themeSetter--light-on" data-attribute="adapted from user 160033 file on freesound.org https://freesound.org/people/160033/sounds/366184/ under CC BY-NC 3.0"></audio>
    <audio ref={darkRef} src="audio/light-off.mp3" className="themeSetter--light-off" data-attribute="adapted from user 160033 file on freesound.org https://freesound.org/people/160033/sounds/366184/ under CC BY-NC 3.0"></audio>
    </>
  );
}

