const initialState={
    id:'9t5p4PAKGT1mcpEAvWYf',
    name:'React JS'
  }
   const documentReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Document':
      return {
        ...state,
        id:action.payload.id,
        name:action.payload.name
      }
      default: return state
    }
  }
  export default documentReducer
  