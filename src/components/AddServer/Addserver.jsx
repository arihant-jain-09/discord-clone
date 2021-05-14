import React, { useState } from 'react'
import { DialogActions, DialogContent, DialogContentText,makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Resizer from "react-image-file-resizer";
import './Addserver.scss'
import { auth, firestore } from '../../firebase/firebase';
import firebase from 'firebase/app'
import { useDispatch } from 'react-redux';
import currentdoc from '../../redux/document/document.actions';
import currentserver from '../../redux/server/server.actions';
import newserver from '../../redux/newserver/newserver.actions';
import { useHistory } from 'react-router';
const useStyles=makeStyles({
    header:{
        textAlign:'center'
    },
    header__heading:{
        fontSize:'2rem',
        color:'#060607',
        padding:'.3rem 2rem',
        fontFamily:'Whitney-bold',
        display:'block'
    },
    header__text:{
        fontSize:'1.5rem',
        display:'block'
    },
    header__servername:{
        marginRight:'80%',
        color:'#6a7480',
        fontSize:'1.25rem',
        fontFamily:'Whitney-medium'
    },
    dialogcontent:{
        backgroundColor:'#fff',
        padding:'1rem 1.6rem'
    },
    dialogaction:{
        backgroundColor:'#f6f6f7',
        padding:'4% 5% 4% 5%',
    },
    paper: { 
        minWidth: '25%',
    },
    input:{
        display:'none'
    },
})
function Addserver() {
    const classes=useStyles();
    const history=useHistory();
    const [open, setOpen] = useState(false);
    const [uploadfile,setuploadfile]=useState()
    const [formValue,setformValue]=useState('');
    const serverRef=firestore.collection('servers');
    const roleRef=firestore.collection('roles');
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                file,
                100,
                100,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64",
                );
            });
        
      const handleSubmit=async (e)=>{
        e.preventDefault();
        let serverid='';
        let generalid='';
        if(formValue){
            if(uploadfile){
                await serverRef.add({
                     servername:formValue,
                     createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                     email:auth.currentUser.email,
                     admin:auth.currentUser.displayName,
                     userimage:auth.currentUser.photoURL,
                     serverimage:uploadfile,
                 }).then(async (value)=>{
                    serverid=value.id;
                    dispatch((newserver({present:true})));
                    dispatch(currentserver({
                        id:value.id,
                        name:formValue
                    }))
                    setuploadfile('');
                    const channelRef=firestore.collection('servers').doc(value.id).collection('channels');
                    await channelRef.add({
                        channel:'general',
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        email:auth.currentUser.email,
                    }).then((value)=>{
                        generalid=value.id})
                    await channelRef.doc(value.id).set({
                        channel:'roles',
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        email:auth.currentUser.email,
                    })
                    let allroleid;
                    const rolerefid=roleRef.doc(value.id);
                    await rolerefid.set({
                        servername:formValue,
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(async()=>{
                        const serverroleRef=serverRef.doc(value.id).collection('allroles');
                        const roletyperef=roleRef.doc(value.id).collection('rolemenu');
                        await serverroleRef.add({
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        rolename:'Person'
                    }).then(async(myval)=>{
                        roletyperef.add({
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Person',
                            serverroletypeid:myval.id,
                        }).then(async(valid)=>{
                            allroleid=valid.id
                        })
                        const serverallroles=serverroleRef.doc(myval.id).collection('allroles');
                        serverallroles.add({
                            color:'#ea596e',
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Female'
                        }).then(async(servallrole)=>{
                            const rolesallref=roletyperef.doc(allroleid).collection('allroles')
                            rolesallref.add({
                                'Female':{
                                    color:'#ea596e',
                                    number:1,
                                    serverroleid:servallrole.id
                                }
                            })
                        })
                        serverallroles.add({
                            color:'#226699',
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Male'
                        }).then(async(servallrole)=>{
                            const rolesallref=roletyperef.doc(allroleid).collection('allroles')
                            rolesallref.add({
                                'Male':{
                                    color:'#226699',
                                    number:1,
                                    serverroleid:servallrole.id
                                }
                            })
                        })
                    })
                    })
                 })
             }
             else{
                await serverRef.add({
                     servername:formValue,
                     createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                     email:auth.currentUser.email,
                     admin:auth.currentUser.displayName,
                     userimage:auth.currentUser.photoURL,
                     serverimage:'',
                 }).then(async (value)=>{
                    serverid=value.id;
                     dispatch((newserver({present:true})));
                    dispatch(currentserver({
                        id:value.id,
                        name:formValue,
                        email:auth.currentUser.email
                    }))
                    const channelRef=firestore.collection('servers').doc(value.id).collection('channels')
                    await channelRef.add({
                        channel:'general',
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        email:auth.currentUser.email,
                    }).then((value)=>{
                        generalid=value.id;})
                    await channelRef.doc(value.id).set({
                        channel:'roles',
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        email:auth.currentUser.email,
                    })
                    let allroleid;
                    const rolerefid=roleRef.doc(value.id);
                    await rolerefid.set({
                        servername:formValue,
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(async()=>{
                        const serverroleRef=serverRef.doc(value.id).collection('allroles');
                        const roletyperef=roleRef.doc(rolerefid.id).collection('rolemenu');
                        await serverroleRef.add({
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        rolename:'Person'
                    }).then(async(myval)=>{
                        roletyperef.add({
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Person',
                            serverroletypeid:myval.id,
                        }).then(async(valid)=>{
                            allroleid=valid.id
                        })
                        const serverallroles=serverroleRef.doc(myval.id).collection('allroles');
                        serverallroles.add({
                            color:'#ea596e',
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Female'
                        }).then(async(servallrole)=>{
                            const rolesallref=roletyperef.doc(allroleid).collection('allroles')
                            rolesallref.add({
                                'Female':{
                                    color:'#ea596e',
                                    number:1,
                                    serverroleid:servallrole.id
                                }
                            })
                        })
                        serverallroles.add({
                            color:'#226699',
                            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                            rolename:'Male'
                        }).then(async(servallrole)=>{
                            const rolesallref=roletyperef.doc(allroleid).collection('allroles')
                            rolesallref.add({
                                'Male':{
                                    color:'#226699',
                                    number:1,
                                    serverroleid:servallrole.id
                                }
                            })
                        })

                    })
                    })

                 })
             }
        }
        setformValue('');
        if(serverid && generalid) history.push(`/discord-clone/channels/${serverid}/${generalid}`)
      }
      const handleImageUpload=async(e)=>{
        const encodedimage=await resizeFile(e.target.files[0]);
        setuploadfile(encodedimage);
      }
      
    return (
    <div className='addserver'>
            <div className="addserver__addicon" onClick={handleClickOpen}>
                <svg className="circleIcon-1-oi1i" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
                </svg>
            </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper}} >
            <DialogContent className={classes.dialogcontent}>
            <DialogContentText component='div' className={classes.header}>
                    <Typography component={'span'} className={classes.header__heading}>
                        Customize your server
                    </Typography>

                    <Typography component={'span'} className={classes.header__text}>
                        Give your new server a personality with a name and an icon.
                    </Typography>
                    <Typography component={'span'} className={classes.header__text}>
                        You can always change it later.
                    </Typography>
                        <div className="addserver__imageupload">
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleImageUpload} />
                                <label htmlFor="icon-button-file">
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M54.8694 2.85498C53.8065 2.4291 52.721 2.04752 51.6153 1.71253L51.3254 2.66957L51.0354 3.62661C51.9783 3.91227 52.9057 4.23362 53.8161 4.58911C54.1311 3.98753 54.4832 3.40847 54.8694 2.85498ZM75.4109 26.1839C76.0125 25.8689 76.5915 25.5168 77.145 25.1306C77.5709 26.1935 77.9525 27.279 78.2875 28.3847L77.3304 28.6746L76.3734 28.9646C76.0877 28.0217 75.7664 27.0943 75.4109 26.1839ZM78.8148 43.8253L79.8102 43.9222C79.9357 42.6318 80 41.3234 80 40C80 38.6766 79.9357 37.3682 79.8102 36.0778L78.8148 36.1747L77.8195 36.2715C77.9389 37.4977 78 38.7414 78 40C78 41.2586 77.9389 42.5023 77.8195 43.7285L78.8148 43.8253ZM43.8253 1.18515L43.9222 0.189853C42.6318 0.0642679 41.3234 0 40 0C38.6766 0 37.3682 0.064268 36.0778 0.189853L36.1747 1.18515L36.2715 2.18045C37.4977 2.06112 38.7414 2 40 2C41.2586 2 42.5023 2.06112 43.7285 2.18045L43.8253 1.18515ZM28.6746 2.66957L28.3847 1.71253C25.8549 2.47897 23.4312 3.48925 21.1408 4.71604L21.6129 5.59756L22.0851 6.47907C24.2606 5.3138 26.5624 4.35439 28.9646 3.62661L28.6746 2.66957ZM15.2587 9.85105L14.6239 9.0784C12.5996 10.7416 10.7416 12.5996 9.0784 14.6239L9.85105 15.2587L10.6237 15.8935C12.2042 13.9699 13.9699 12.2042 15.8935 10.6237L15.2587 9.85105ZM5.59756 21.6129L4.71604 21.1408C3.48925 23.4312 2.47897 25.8549 1.71253 28.3847L2.66957 28.6746L3.62661 28.9646C4.35439 26.5624 5.3138 24.2607 6.47907 22.0851L5.59756 21.6129ZM0 40C0 38.6766 0.0642679 37.3682 0.189853 36.0778L1.18515 36.1747L2.18045 36.2715C2.06112 37.4977 2 38.7414 2 40C2 41.2586 2.06112 42.5023 2.18045 43.7285L1.18515 43.8253L0.189853 43.9222C0.064268 42.6318 0 41.3234 0 40ZM2.66957 51.3254L1.71253 51.6153C2.47897 54.1451 3.48926 56.5688 4.71604 58.8592L5.59756 58.3871L6.47907 57.9149C5.3138 55.7394 4.35439 53.4376 3.62661 51.0354L2.66957 51.3254ZM9.85105 64.7413L9.0784 65.3761C10.7416 67.4004 12.5996 69.2584 14.6239 70.9216L15.2587 70.1489L15.8935 69.3763C13.9699 67.7958 12.2042 66.0301 10.6237 64.1065L9.85105 64.7413ZM21.6129 74.4024L21.1408 75.284C23.4312 76.5107 25.8549 77.521 28.3847 78.2875L28.6746 77.3304L28.9646 76.3734C26.5624 75.6456 24.2607 74.6862 22.0851 73.5209L21.6129 74.4024ZM36.1747 78.8148L36.0778 79.8102C37.3682 79.9357 38.6766 80 40 80C41.3234 80 42.6318 79.9357 43.9222 79.8102L43.8253 78.8148L43.7285 77.8195C42.5023 77.9389 41.2586 78 40 78C38.7414 78 37.4977 77.9389 36.2715 77.8195L36.1747 78.8148ZM51.3254 77.3304L51.6153 78.2875C54.1451 77.521 56.5688 76.5107 58.8592 75.284L58.3871 74.4024L57.9149 73.5209C55.7394 74.6862 53.4376 75.6456 51.0354 76.3734L51.3254 77.3304ZM64.7413 70.1489L65.3761 70.9216C67.4004 69.2584 69.2584 67.4004 70.9216 65.3761L70.1489 64.7413L69.3763 64.1065C67.7958 66.0301 66.0301 67.7958 64.1065 69.3763L64.7413 70.1489ZM74.4024 58.3871L75.284 58.8592C76.5107 56.5688 77.521 54.1451 78.2875 51.6153L77.3304 51.3254L76.3734 51.0354C75.6456 53.4375 74.6862 55.7393 73.5209 57.9149L74.4024 58.3871Z" fill="currentColor"></path><circle cx="68" cy="12" r="12" fill="#5865f2"></circle><path d="M73.3332 11.4075H68.5924V6.66675H67.4072V11.4075H62.6665V12.5927H67.4072V17.3334H68.5924V12.5927H73.3332V11.4075Z" fill="white"></path><path d="M40 29C37.794 29 36 30.794 36 33C36 35.207 37.794 37 40 37C42.206 37 44 35.207 44 33C44 30.795 42.206 29 40 29Z" fill="currentColor"></path><path d="M48 26.001H46.07C45.402 26.001 44.777 25.667 44.406 25.111L43.594 23.891C43.223 23.335 42.598 23 41.93 23H38.07C37.402 23 36.777 23.335 36.406 23.89L35.594 25.11C35.223 25.667 34.598 26 33.93 26H32C30.895 26 30 26.896 30 28V39C30 40.104 30.895 41 32 41H48C49.104 41 50 40.104 50 39V28C50 26.897 49.104 26.001 48 26.001ZM40 39C36.691 39 34 36.309 34 33C34 29.692 36.691 27 40 27C43.309 27 46 29.692 46 33C46 36.31 43.309 39 40 39Z" fill="currentColor"></path><path d="M24.6097 52.712V47.72H22.5457V52.736C22.5457 53.792 22.0777 54.404 21.1417 54.404C20.2177 54.404 19.7377 53.78 19.7377 52.712V47.72H17.6737V52.724C17.6737 55.04 19.0897 56.132 21.1177 56.132C23.1217 56.132 24.6097 55.016 24.6097 52.712ZM26.0314 56H28.0834V53.252H28.6114C30.6154 53.252 31.9474 52.292 31.9474 50.42C31.9474 48.62 30.7114 47.72 28.6954 47.72H26.0314V56ZM29.9554 50.456C29.9554 51.308 29.4514 51.704 28.5394 51.704H28.0594V49.268H28.5754C29.4874 49.268 29.9554 49.664 29.9554 50.456ZM37.8292 56L37.5532 54.224H35.0092V47.72H32.9572V56H37.8292ZM45.9558 51.848C45.9558 49.292 44.4078 47.564 42.0078 47.564C39.6078 47.564 38.0478 49.304 38.0478 51.872C38.0478 54.428 39.6078 56.156 41.9838 56.156C44.3958 56.156 45.9558 54.404 45.9558 51.848ZM43.8918 51.86C43.8918 53.504 43.1958 54.548 41.9958 54.548C40.8078 54.548 40.0998 53.504 40.0998 51.86C40.0998 50.216 40.8078 49.172 41.9958 49.172C43.1958 49.172 43.8918 50.216 43.8918 51.86ZM52.2916 56.084L54.3676 55.748L51.4876 47.684H49.2316L46.2556 56H48.2716L48.8236 54.284H51.6916L52.2916 56.084ZM50.2516 49.796L51.1756 52.676H49.3156L50.2516 49.796ZM62.5174 51.848C62.5174 49.388 61.0174 47.72 58.1374 47.72H55.2814V56H58.1854C60.9814 56 62.5174 54.308 62.5174 51.848ZM60.4534 51.86C60.4534 53.636 59.5414 54.404 58.0774 54.404H57.3334V49.316H58.0774C59.4814 49.316 60.4534 50.12 60.4534 51.86Z" fill="currentColor"></path>
                                    </svg>
                                </label>
                        </div>
                    <Typography component={'span'} className={classes.header__servername}>
                        SERVER NAME
                    </Typography>                
            </DialogContentText>
                <input type="text" required placeholder={`${auth.currentUser && auth.currentUser.displayName}'s server`} className='input__content' autoFocus onChange={(e)=>setformValue(e.target.value)} value={formValue}/>
            </DialogContent>
            <DialogActions className={classes.dialogaction}>
            <button type='text' onClick={handleClose} className='addserver__form-back'>Back</button>
                <form onSubmit={handleSubmit} className='addserver__form'>
                    <button type='submit' onClick={handleClose} className='addserver__form-button'>Create</button>
                </form>
            </DialogActions>
        </Dialog>
    </div>
    )
}

export default Addserver
