const initialState={
    clicked:false,
  }
   const replytoggleReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Reply_toggle':
      return {
        ...state,
        clicked:!state.clicked,
      }
      default: return state
    }
  }
  export default replytoggleReducer
  