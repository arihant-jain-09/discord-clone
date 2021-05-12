import {all,call, takeEvery} from 'redux-saga/effects'
import { auth, firestore, default as firebase } from '../../firebase/firebase';

export function* DeleteServerSuccess({payload}){
    if(payload.email===auth.currentUser.email){
        const serverRef=yield firestore.collection('servers').doc(payload.id);
        const roleref=yield firestore.collection('roles').doc(payload.id);
        yield roleref.delete();        
        yield serverRef.delete();
        const userref=yield firestore.collection('users');
        yield userref.doc(auth.currentUser.uid).set({
          roles:{
            [auth.currentUser.uid]:firebase.firestore.FieldValue.delete()
          }
        },{ merge: true })  
    }
    else{
      return
    }
}

export function* DeleteServerStart(){
    yield takeEvery('Delete_Server_Start',DeleteServerSuccess)
}

export function* AddServerStart(){

}



export function* Serversagas(){
    yield all([call(AddServerStart),call(DeleteServerStart)])
}