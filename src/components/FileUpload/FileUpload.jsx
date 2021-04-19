import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {auth, firestore} from '../../firebase/firebase'
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from "react-image-file-resizer";
import openupload from '../../redux/openupload/message.actions'
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
        const image=file[0];
        try{
            dispatch(openupload());
            const resizedfile=await resizeFile(image);
            const channelRef= firestore.collection('servers').doc(currentserverid).collection('channels').doc(id).collection('messages');
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
        catch(err){
            console.log(err);
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
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={false}
            showPreviewsInDropzone={false}
            maxFileSize={5000000}
            filesLimit={1}
            onAdd={handleupload}
            onDrop={handleupload}
        />
        </div>
    )
}

export default FileUpload
