const initialState={
    id:'LNhwXEYI7pTlOgTN9Chm',
    name:'Welcome to Discord'
  }
   const currentserverReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Server':
      return {
        ...state,
        id:action.payload.id,
        name:action.payload.name
      }
      default: return state
    }
  }
  export default currentserverReducer
  