import {createSelector} from 'reselect'

const ServerSelector=state=>state.currentserver

export const CurrentServerSelector=createSelector(
    [ServerSelector],
    server=>server.id
)