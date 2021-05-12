import React,{lazy,Suspense} from 'react'
import { Route, Switch } from 'react-router'
import Spinner from '../../components/Spinner/Spinner';
const Home_serverId_channel=lazy(()=>import('../Home_serverId_channel/Home_serverId_channel'))
const ServerPage = ({match}) => {
    return (
        <>
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route path={`${match.path}/:channelId`} component={Home_serverId_channel}/>
            </Switch>
        </Suspense>
        </>
    )
}

export default ServerPage
