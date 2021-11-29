import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { EditMessage,MsgToEdit } from '../../../../chatSlice';
import './ChatEdit.scss'
const ChatEdit = ({msg}) => {
  const [formValue,setformValue]=useState(msg.text);
  const  dispatch = useDispatch();
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      dispatch(MsgToEdit(null));
    }
  }, [dispatch]);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const rows=formValue.split("\n").length;
    const handleSubmit=(e)=>{
      if(e) e.preventDefault();
      dispatch(EditMessage({
        ...msg,text:formValue
      }))
      console.log('submitted');
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="chatedit">
          <textarea type='text' onKeyDown={(e)=>{
            if(e.key==='Enter'){
              handleSubmit()
            }
          }} autoFocus required rows={rows} value={formValue} onChange={(e)=>{setformValue(e.target.value)}} style={{width:'100%'}} className='chatedit__inputarea'/>
        </div>
        <div className="editinstruction">
          <p className='editinstruction__p'>escape to <span className='editinstruction__span' >cancel</span> • enter to <span className='editinstruction__span' onClick={handleSubmit}>save</span></p>
        </div>
      </form>
    </>
  )
}

export default ChatEdit
