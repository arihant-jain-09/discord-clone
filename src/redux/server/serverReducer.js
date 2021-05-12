const initialState={
    id:null,
    name:'Welcome to Discord',
    email:'',
  }
   const currentserverReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Server':
      return {
        ...state,
        id:action.payload.id,
        name:action.payload.name,
        email:action.payload.email,
      }
      default: return state
    }
  }
  export default currentserverReducer
  