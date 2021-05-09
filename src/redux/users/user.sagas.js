import { all, call, takeLatest } from "@redux-saga/core/effects";
import { auth,CreateUserProfileDocument,Googleprovider } from "../../firebase/firebase";

export function* GoogleSignInSuccess(){
    yield auth.signInWithPopup(Googleprovider)
    yield call(CreateUserProfileDocument);
}

export function* GoogleSignInStart(){
    yield takeLatest('Google_SignIn_Start',GoogleSignInSuccess)
}


export function* userSagas(){
    yield all([call(GoogleSignInStart)])
}