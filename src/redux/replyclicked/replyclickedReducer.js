const initialState={
    id:'',
    sender:'',
    msg:'',
    photo:'',
    // base64:''
  }
   const ReplyclickedReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Reply_message':
        return{
          ...state,
            id:action.payload.id,
            sender:action.payload.sender,
            msg:action.payload.msg,
            photo:action.payload.photo,
            // base64:action.payload.base64
        }
      
      default: return state
    }
  }
  export default ReplyclickedReducer
  