import React from 'react'
import firebase from 'firebase/app'
import { auth } from '../../firebase/firebase';
import {Button} from '@material-ui/core'
import './homepage.scss'
export default function Homepage() {
    const signInWithGoogle=()=>{
        const provider=new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <div className="discord__homepage">
            <img className="discord__homepage-svg" src="./discord.svg" alt="Discord Svg"/>
            <Button onClick={signInWithGoogle} className="discord__homepage-btn" color='primary' variant='contained'>Sign In</Button>
        </div>
    )
}
