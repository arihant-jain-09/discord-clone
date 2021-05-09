import {all,call} from 'redux-saga/effects'
import { DocumentSagas } from './document/document.sagas'
import { Serversagas } from './server/server.sagas'
import { userSagas } from './users/user.sagas'
export default function* rootSaga(){
    yield all([call(userSagas),call(DocumentSagas),call(Serversagas)])
}
