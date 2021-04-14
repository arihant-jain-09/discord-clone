import firebase from 'firebase/app'
import { auth } from '../../firebase/firebase';
import {Button} from '@material-ui/core'
function SignIn() {
    const signInWithGoogle=()=>{
        const provider=new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    return(
        <Button onClick={signInWithGoogle} className="discord__homepage-btn" color='primary' variant='contained'>Sign In</Button>
    )
}

export default SignIn
