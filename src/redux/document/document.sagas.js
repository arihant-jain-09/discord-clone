import {all,call, put, select, takeLatest} from 'redux-saga/effects'
import { CurrentServerSelector } from '../server/server.selectors'
import currentdoc from './document.actions'

export function* SwitchDocumentSuccess(){
    const id=yield select(CurrentServerSelector)
    // yield put(currentdoc())
    console.log(id);
}

export function* SwitchDocumentStart(){
    yield takeLatest('Current_Server',SwitchDocumentSuccess)
}

export function* DocumentSagas(){
    yield all([call(SwitchDocumentStart)])
}