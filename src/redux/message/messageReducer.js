const initialState={
    id:'',
    msg:''
  }
   const messageReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_message':
      return {
        ...state,
        id:action.payload.id,
        msg:action.payload.msg
      }
      default: return state
    }
  }
  export default messageReducer
  