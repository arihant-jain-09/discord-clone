import {all,call} from 'redux-saga/effects'



export function* AddServerStart(){

}



export function* Serversagas(){
    yield all(call(AddServerStart))
}