// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'
// import 'firebase/compat/storage'
// import 'firebase/compat/database'
// import "firebase/compat/performance";
// var firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY ,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
//   projectId: process.env.REACT_APP_PROJECT_ID ,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ,
//   appId: process.env.REACT_APP_APP_ID ,
//   };
//   firebase.initializeApp(firebaseConfig);
//   export const firestore=firebase.firestore();
//   export default firebase;
//   export const auth=firebase.auth();
//   export const storage=firebase.storage();
//   export const perf = firebase.performance();
//   export const db=firebase.database();
//   export const Googleprovider=new firebase.auth.GoogleAuthProvider();
//   // const signinWithGithub=()=>{
// //   const provider=new firebase.auth.GithubAuthProvider();
// //   auth.signInWithPopup(provider).catch(alert);
// // }
//   export const CreateUserProfileDocument=()=>{
//     const userRef=firestore.collection('users').doc(auth.currentUser.uid);
//     userRef.set({
//       username:auth.currentUser.displayName,
//       useremail:auth.currentUser.email,
//       userphoto:auth.currentUser.photoURL,
//       createdAt:firebase.firestore.FieldValue.serverTimestamp(),
//       servers:{},
//     },{merge:true})
//   }