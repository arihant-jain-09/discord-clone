import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import { DialogContent, DialogContentText } from '@material-ui/core';
import firebase from 'firebase/app'
import './AddNewRole.scss'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '50rem',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  anotherrole:{
    marginTop:'1rem',

  },
  dialogcontent:{
    width:'100%'
  },
  finishedanotherrole:{
    marginTop:'1rem',
    marginLeft:'2%'
  }
}));

function getSteps() {
  return ['Get Started to Add Role', 'Add Role type', 'Add role'];
}

export default function AddNewRole({handleClose}) {
  const classes = useStyles();
  // const roleid=useSelector((state)=>state.currentserver.roleid);
  const [activeStep, setActiveStep] = React.useState(0);
  const [multirole,setmultirole]=useState([]);
  const [completed, setCompleted] = React.useState(false);
  const steps = getSteps();
  const currentserverid=useSelector((state)=>state.currentserver.id);
    const [formValue,setformValue]=useState({
        color:'#fff',
        rolename:''
    });
  const [typeofrole,settypeofrole]=useState('');
  const serverRef=firestore.collection('servers').doc(currentserverid).collection('allroles');
  const roleRef=firestore.collection('roles').doc(currentserverid).collection('rolemenu');
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select your Role';
      case 1:
        return <>
          <DialogContent className={classes.dialogcontent}>
              <DialogContentText className={classes.header}>
                      <Typography component={'span'} className={classes.header__rolename}>
                         Type Of Role
                      </Typography>                
              </DialogContentText>
                  <input type="text" name='rolename' required className='input__content' autoFocus onChange={(e)=>settypeofrole(e.target.value)} value={typeofrole}/>
              </DialogContent>
        </>
      case 2:
        return <>
            <DialogContent className={classes.dialogcontent}>
              <DialogContentText className={classes.header}>
                      <Typography component={'span'} className={classes.header__rolename}>
                         Role Name
                      </Typography>                
              </DialogContentText>
                  <input type="text" name='rolename' required className='input__content' autoFocus onChange={handleChange} value={formValue.rolename}/>
                  <DialogContentText className={classes.roleheader}>
                      <Typography component={'span'} className={classes.roleheader__rolecolor}>
                          Role Color
                          </Typography> 
                      </DialogContentText>
                  <input type="text" name='color' required className='input__content' onChange={handleChange} value={formValue.color}/>
                  {/* {formValue.rolename && 'DO you want to add another role with same category type?'} */}
                  <div className="addmorediv">
                    <Button onClick={handleaddanotherrole} className={classes.anotherrole} color='primary' variant='contained'>Add another role with same category type?</Button>
                    <Button onClick={handlefinishedrole} className={classes.finishedanotherrole} color='primary' variant='contained'>Finished adding more</Button>
                  </div>
                 
              </DialogContent>
        </>
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleaddanotherrole=()=>{
    setmultirole(()=>{
      return [...multirole,formValue]
    })
    setformValue({
      color:'',
      rolename:''
    })
  }
  const handlefinishedrole=()=>{
    if(typeofrole){
      if(formValue.rolename){
        setmultirole(()=>{
          return [...multirole,formValue]
        })
      }
  }
  setformValue({
    color:'',
    rolename:''
  })
}
    const handleChange=(e)=>{
    const {name,value}=e.target;
    setformValue(()=>{
        return{
            ...formValue,
            [name]:value
        }
    })
  }
  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const [typeid,settypeid]=useState('');
  const [roletypeid,setroletypeid]=useState('');
  const handlebranchandnext=async()=>{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(!completed){
      if(typeofrole){
          await serverRef.add({
              createdAt:firebase.firestore.FieldValue.serverTimestamp(),
              rolename:typeofrole
          }).then(async(val)=>{
              settypeid(val.id);
              await roleRef.add({
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                rolename:typeofrole,
                serverroletypeid:val.id,
              }).then((valid)=>{
                console.log('called',valid.id);
                setroletypeid(valid.id);
              })
          })
          setCompleted(true);
      }
  }
  }
  const handleroleandnext=async()=>{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(typeofrole){
        const addroleref=serverRef.doc(typeid).collection('allroles');
        if(multirole && multirole.length){
          multirole.map(async(rol)=>{
            await addroleref.add({
              color:rol.color,
              createdAt:firebase.firestore.FieldValue.serverTimestamp(),
              rolename:rol.rolename
          }).then(async (thisid)=>{
            const allroleRef=roleRef.doc(roletypeid).collection('allroles');
            await allroleRef.add({
              [rol.rolename]:{
                color:rol.color,
                number:1,
                serverroleid:thisid.id
              }
            })
          }).then(()=>{
            settypeofrole('');
            setformValue('');
            settypeid('');
            setCompleted(false);
          })
          })
          setmultirole([]);
          handleClose();
        }
        else{
          if(formValue.rolename){
            await addroleref.add({
                color:formValue.color,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                rolename:formValue.rolename
            }).then(async (thisid)=>{
              const allroleRef=roleRef.doc(roletypeid).collection('allroles');
              await allroleRef.add({
                [formValue.rolename]:{
                  color:formValue.color,
                  number:1,
                  serverroleid:thisid.id
                }
              }).then(()=>{
                settypeofrole('');
                setformValue('');
                settypeid('');
                setCompleted(false);
              })
            })
        }
        handleClose();
        }  
    }
    
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? null : (
          <div>
            <Typography component='div' className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {
                  activeStep && activeStep===1? <Button variant="contained" color="primary" onClick={handlebranchandnext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button> : (activeStep===2 ? <Button variant="contained" color="primary" onClick={handleroleandnext}>
                Finish</Button> : <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>) 
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}