import React,{lazy,Suspense} from 'react';
import './App.scss'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Redirect, Route, Switch } from 'react-router';
import Universal from './pages/Universal/Universal';
import LayoutSidebar from './pages/Layout_Sidebar/Layout_Sidebar';
import Spinner from './components/Spinner/Spinner';
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './pages/ErrorBoundaries/Errorboundaries.styles.jsx'
import Sidebar from './pages/Sidebar/Sidebar';
const Homepage=lazy(()=>import('./pages/HomePage/homepage.jsx'));
const Home=lazy(()=>import('./pages/home@me/home@me'));
const ServerPage=lazy(()=>import('./pages/ServerPage/ServerPage'));

const ErrorFallback=({error,resetErrorBoundary})=>{
  return <>
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
      <ErrorImageText>Sorry this page is broken</ErrorImageText>
      <button onClick={resetErrorBoundary}>Try again</button>
    </ErrorImageOverlay>
  </>
}

function App() {
const [user]=useAuthState(auth);
  return (
    <div className="App">
      <main>

        {!user && <Redirect to='/discord-clone'/>}
        <Switch>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Spinner/>}>
          <Route exact path='/discord-clone' render={()=>auth.currentUser?<Redirect to='/discord-clone/channels/@me'/>:<Homepage/>} />
          <Route path='/discord-clone/channels' component={Sidebar}/>
            <Switch>
              <Route exact path='/discord-clone/channels/@me' render={()=><Universal><Home></Home></Universal>}/>
              <Route path='/discord-clone/channels/:serverId' render={(props)=><LayoutSidebar><ServerPage {...props}/></LayoutSidebar>}/>
            </Switch>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </main>
    </div>
  );
}

export default App;
