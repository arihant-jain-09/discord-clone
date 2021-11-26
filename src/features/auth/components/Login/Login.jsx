import React from 'react'
import {ReactComponent as Discord} from '../../../../assets/discord_logo.svg'
import {ReactComponent as Google} from '../../../../assets/google_logo.svg'
import { auth, CreateUserProfileDocument, Googleprovider } from '../../../../firebase/firebase'
import './Login.scss'
const Login = () => {
  const GoogleSignIn=async()=>{
    await auth.signInWithPopup(Googleprovider);
    CreateUserProfileDocument();
  }
  return (
    <>
      <div className="login">
        <div className="login__logo">
          <Discord/>
        </div>
        <div className="login__button" onClick={GoogleSignIn}>
          <Google/>
          <input type="button" value="Sign In with Google"/>
        </div>
      </div>
    </>
  )
}

export default Login
