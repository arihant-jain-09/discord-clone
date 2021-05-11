import {all,call, select, takeLatest} from 'redux-saga/effects'
// import { CurrentServerSelector } from '../server/server.selectors'


// export function* SwitchDocumentSuccess(){
//     const id=yield select(CurrentServerSelector)
//     // yield put(currentdoc())

// }

// export function* SwitchDocumentStart(){
//     yield takeLatest('Current_Server',SwitchDocumentSuccess)
// }

export function* DocumentSagas(){
    yield all([])
}