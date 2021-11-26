import React from 'react';
import './App.scss';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './features/auth/components/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import ServerPageIndex from './features/sidebar/Server/components';
import ChannelPageIndex from './features/sidebar/Channel/components';
import ThemeSetter from "./components/ThemeSetter/ThemeSetter.jsx";
import Messaging from './pages/Messaging/Messaging';
const App=()=> {
  const [user]=useAuthState(auth);
  console.log(user);
  return (
    <>
      <div className="app">
      <ThemeSetter />
        <Switch>
          <Route exact path='/' render={()=>auth.currentUser?<Redirect to='/channels/@me'/>:<Login/>}/>
          <Route path='/channels/'>
            <ServerPageIndex/>
            <ChannelPageIndex/>
            <Switch>
              <Route exact path='/channels/@me'>
                <div className="app__home">
                  <HomePage/>
                </div>
              </Route>
              <Route path='/channels/*'>
                <div className="app__chat">
                  <Messaging/>
                </div>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
