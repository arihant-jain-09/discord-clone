const initialState={
    id:'',
    msg:''
  }
   const newmessageReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'New_message':
      return {
        ...state,
        id:action.payload.id,
        msg:action.payload.msg
      }
      default: return state
    }
  }
  export default newmessageReducer
  