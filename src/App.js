import React from 'react';
import './App.scss'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Redirect, Route, Switch } from 'react-router';
import Homepage from './pages/homepage';
import Home from './pages/home@me/home@me';
import Universal from './pages/Universal/Universal';
import Home_serverId from './pages/home_serverId/home_serverId';
function App() {
const [user]=useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {!user && <Redirect to='/'/>}
        <Switch>
          <Route exact path='/' render={()=>auth.currentUser?<Redirect to='channels/@me'/>:<Homepage/>} />
          <Universal>
            <Switch>
              <Route exact path='/channels/@me' component={Home}/>
              <Route exact path='/channels/:serverId' component={Home_serverId}/>
            </Switch>
          </Universal>
        </Switch>
      </main>
    </div>
  );
}

export default App;
