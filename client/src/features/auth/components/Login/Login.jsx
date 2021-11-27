import React from 'react'
import {ReactComponent as Discord} from '../../../../assets/discord_logo.svg'
import {ReactComponent as Google} from '../../../../assets/google_logo.svg'
import './Login.scss'
import { useHistory } from 'react-router';
const Login = () => {
  const history=useHistory();
  return (
    <>
      <div className="login">
        <div className="login__logo">
          <Discord/>
        </div>
        <div className="login__button" onClick={()=>{
          history.push('/auth/google');
          window.location.reload();
        }
        }>
          <Google/>
          <input type="button" value="Sign In with Google"/>
        </div>
      </div>
    </>
  )
}

export default Login
