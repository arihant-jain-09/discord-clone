const initialState={
  open:false,
  }
   const openReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Change_open':
      return {
        ...state,
        open:!state.open,
      }
      default: return state
    }
  }
  export default openReducer
  