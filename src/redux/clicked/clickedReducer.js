const initialState={
    clicked:false,
  }
   const clickedReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Clicked':
      return {
        ...state,
        clicked:!state.clicked,
      }
      default: return state
    }
  }
  export default clickedReducer
  