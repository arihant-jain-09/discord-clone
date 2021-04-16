import React from 'react';
import './App.scss'
import Main from './components/Main/Main.jsx'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { Button } from '@material-ui/core';

function App() {
  const [user]=useAuthState(auth);
  const signInWithGoogle=()=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main>
         {
          user? 
          <Main user={user}/>
          : (<div className="discord__homepage">
             <img className="discord__homepage-svg" src="./discord.svg" alt="Discord Svg"/>
            <Button onClick={signInWithGoogle} className="discord__homepage-btn" color='primary' variant='contained'>Sign In</Button>
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
