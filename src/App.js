import React from 'react';
import './App.scss'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Redirect, Route, Switch } from 'react-router';
import Homepage from './pages/homepage';
import Home from './pages/home@me/home@me';
import Universal from './pages/Universal/Universal';
import ServerPage from './pages/ServerPage/ServerPage';
import LayoutSidebar from './pages/Layout_Sidebar/Layout_Sidebar';
function App() {
const [user]=useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {/* <img src='/discord-clone/discord_server.png' alt='discord-svg'/> */}
        {!user && <Redirect to='/discord-clone'/>}
        <Switch>
          <Route exact path='/discord-clone' render={()=>auth.currentUser?<Redirect to='/discord-clone/channels/@me'/>:<Homepage/>} />
            <Switch>
              <Route exact path='/discord-clone/channels/@me' render={()=><Universal><Home></Home></Universal>}/>
              <Route path='/discord-clone/channels/:serverId' render={(props)=><LayoutSidebar><ServerPage {...props}/></LayoutSidebar>}/>
            </Switch>
        </Switch>
      </main>
    </div>
  );
}

export default App;
