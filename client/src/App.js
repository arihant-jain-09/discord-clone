import React, { useEffect } from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './features/auth/components/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import ServerPageIndex from './features/sidebar/Server/components';
import ChannelPageIndex from './features/sidebar/Channel/components';
import ThemeSetter from "./components/ThemeSetter/ThemeSetter.jsx";
import Messaging from './pages/Messaging/Messaging';
import axios from 'axios';
import { setCurrentUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const App=()=> {
  const user=useSelector((state)=>state.auth?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/api/current_user').then((response)=>{
      dispatch(setCurrentUser(response.data));
    })
    return () => {
    
    }
  }, [dispatch])
  console.log(user);
  return (
    <>
      <div className="app">
      <ThemeSetter />
        <Switch>
          <Route exact path='/' render={()=>user?<Redirect to='/channels/@me'/>:<Login/>}/>
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
