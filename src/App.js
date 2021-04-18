import React from 'react';
import './App.scss'
import Main from './components/Main/Main.jsx'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { Button, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles=makeStyles({
  github:{
    marginTop:'1rem',
    backgroundColor:'#020000',
    color:'#fff',
    '&:hover':{
      backgroundColor:'rgba(2,0,0,.75)'
    }
  },
  google:{
    padding:'.75rem'
  },
  githubicon:{
    color:'white'
  }
})
function App() {
  const [user]=useAuthState(auth);
  const signInWithGoogle=()=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}
const signinWithGithub=()=>{
  const provider=new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider).catch(alert);
}
const classes=useStyles();
  return (
    <div className="App">
      <header className="App-header">
        {console.log(user)}
      </header>
      <main>
         {
          user? 
          <Main user={user}/>
          : (<div className="discord__homepage">
             <img className="discord__homepage-svg" src="./discord.svg" alt="Discord Svg"/>
            <Button onClick={signInWithGoogle} className={`${classes.google} discord__homepage-btn`} color='primary' variant='contained'>Sign In with Google</Button>
            {/* <Button onClick={signinWithGithub} startIcon={<GitHubIcon className={classes.githubicon}/>} className={`${classes.github} discord__homepage-btn`} variant='outlined'>Sign In With Github</Button> */}
            </div>)
        }
          {/* <Route exact path='/' render={()=>user?(<Redirect to='/channels'/>):<Homepage/>} />
          <Route exact path='/channels' render={(user) => ( <Main user={user} isAuthed={true} />
            )}/>
        </Switch> */}
      </main>
    </div>
  );
}

export default App;
