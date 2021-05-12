import {all,call} from 'redux-saga/effects'
import { Serversagas } from './server/server.sagas'
import { userSagas } from './users/user.sagas'
export default function* rootSaga(){
    yield all([call(userSagas),call(Serversagas)])
}
