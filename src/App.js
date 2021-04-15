import React from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage.jsx'
import Main from './components/Main/Main.jsx'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

function App() {
  const [user]=useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={()=>user?(<Redirect to='/channels'/>):<Homepage/>} />
          <Route exact path='/channels' render={(user) => ( <Main user={user} isAuthed={true} />
            )}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;
