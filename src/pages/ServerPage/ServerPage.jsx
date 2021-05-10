import React from 'react'
import { Route, Switch } from 'react-router'
import Home_serverId from '../home_serverId/home_serverId';
import Home_serverId_channel from '../Home_serverId_channel/Home_serverId_channel';
const ServerPage = ({match}) => {
    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`} component={Home_serverId}/>
                <Route path={`${match.path}/:channelId`} component={Home_serverId_channel}/>
            </Switch>
        </>
    )
}

export default ServerPage
