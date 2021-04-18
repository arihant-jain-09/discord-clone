const initialState={
    datechange:false,
  }
   const dateChangedReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Date_changed':
      return {
        ...state,
        datechange:!state.datechange,
      }
      default: return state
    }
  }
  export default dateChangedReducer
  