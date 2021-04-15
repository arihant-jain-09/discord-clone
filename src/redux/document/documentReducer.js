const initialState={
    doc:null
  }
   const documentReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Document':
      return {
        ...state,
        doc:action.payload
      }
      default: return state
    }
  }
  export default documentReducer
  