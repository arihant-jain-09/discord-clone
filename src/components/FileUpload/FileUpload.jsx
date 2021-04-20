import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {auth, firestore} from '../../firebase/firebase'
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from "react-image-file-resizer";
import openupload from '../../redux/openupload/message.actions'
import {storage} from '../../firebase/firebase'
import replytoggle from '../../redux/replytoggle/replytoggle.actions';
// import {db} from '../../firebase/firebase'
// import storage from '../../firebase/firebase'
const useStyles=makeStyles({
    drop:{
        backgroundColor:'#2C2F33',
        color:'#e6e8e8'
    },
    icon:{
        color:'gray'
    },
})


function FileUpload() {
    const id= useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const toggle=useSelector((state)=>state.replytoggle.clicked);
    const replymsg=useSelector((state)=>state.reply);
    const classes=useStyles();
    const dispatch = useDispatch();
        const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                file,
                350,
                350,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
                );
            });
  
    const handleupload=async(file)=>{
        if(['audio/mpeg', 'audio/mp4', 'audio/ogg','audio/wav'].includes(file[0].type)){
            const audio=file[0];
            console.log(audio);
            try{
                dispatch(openupload());
                const storageRef=storage.ref();
                const fileRef = storageRef.child(audio.name)
                await fileRef.put(audio).then(() => {
                fileRef.getDownloadURL().then(function (url) {
                    console.log(url);
                    const channelRef= firestore.collection('servers').doc(currentserverid).collection('channels').doc(id).collection('messages');
                    if(toggle){
                        dispatch(replytoggle());
                        channelRef.add({
                            message:'',
                            audioname:audio.name,
                            audiourl:url,
                            audiosize:audio.size,
                            sendername:auth.currentUser.displayName,
                            senderemail:auth.currentUser.email,
                            senderuid:auth.currentUser.uid,
                            senderphoto:auth.currentUser.photoURL,
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            reply:replymsg
                        })
                    }
                    else{
                        channelRef.add({
                            message:'',
                            audioname:audio.name,
                            audiourl:url,
                            audiosize:audio.size,
                            sendername:auth.currentUser.displayName,
                            senderemail:auth.currentUser.email,
                            senderuid:auth.currentUser.uid,
                            senderphoto:auth.currentUser.photoURL,
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        })
                    }
                    });
                    console.log("Uploaded a file")
                    })
            }
            catch(err){
                console.log(err);
            }
            
        }
        //////////////////////////////////image file
        if(['image/jpeg', 'image/png', 'image/bmp','image/x-icon'].includes(file[0].type))
        {
        const image=file[0];
        console.log(image);
        try{
            dispatch(openupload());
            const resizedfile=await resizeFile(image);
            const channelRef= firestore.collection('servers').doc(currentserverid).collection('channels').doc(id).collection('messages');
            if(toggle){
                dispatch(replytoggle());
                await channelRef.add({
                    message:'',
                    base64:resizedfile,
                    sendername:auth.currentUser.displayName,
                    senderemail:auth.currentUser.email,
                    senderuid:auth.currentUser.uid,
                    senderphoto:auth.currentUser.photoURL,
                    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                    reply:replymsg
                })
            }
            else{
                await channelRef.add({
                    message:'',
                    base64:resizedfile,
                    sendername:auth.currentUser.displayName,
                    senderemail:auth.currentUser.email,
                    senderuid:auth.currentUser.uid,
                    senderphoto:auth.currentUser.photoURL,
                    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }
}
        /////////////////////Realtime Datasbase
        // try{
        //     const resizedfile=await resizeFile(image);
        //     const uploadref=db.ref('uploads');
        //     const newuploadRef=uploadref.push();
        //     (await newuploadRef).set({
        //         newupload:resizedfile
        //     })
        //     dispatch(currentkey({key:newuploadRef.key}));
        // }
        // catch(err){
        //     console.log(err);
        // }
        
        // const storageRef=storage.ref();
        // const fileRef = storageRef.child(file.name)
        
        // await fileRef.put(file).then(() => {
        // fileRef.getDownloadURL().then(function (url) {
        //    console.log(url);
        //     });
        //     console.log("Uploaded a file")
        //     })

        
    
    return (
        <div>
            <DropzoneArea
            dropzoneClass={classes.drop}
            classes={{icon:classes.icon,image:classes.imageContainer}}
            // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={false}
            showPreviewsInDropzone={false}
            maxFileSize={10000000}
            filesLimit={1}
            onAdd={handleupload}
            onDrop={handleupload}
        />
        </div>
    )
}

export default FileUpload
