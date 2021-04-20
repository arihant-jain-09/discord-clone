const initialState={
    present:false
  }
   const newserverReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'New_Server':
      return {
        ...state,
        present:action.payload.present
      }
      default: return state
    }
  }
  export default newserverReducer
  