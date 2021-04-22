const initialState={
    id:'LNhwXEYI7pTlOgTN9Chm',
    name:'Welcome to Discord',
    email:'',
    roleid:''
  }
   const currentserverReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Server':
      return {
        ...state,
        id:action.payload.id,
        name:action.payload.name,
        email:action.payload.email,
        roleid:action.payload.roleid,
      }
      default: return state
    }
  }
  export default currentserverReducer
  