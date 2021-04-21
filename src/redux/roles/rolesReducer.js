const initialState={
    admin:'',
    squad:''
  }
   const CurrentRoleReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'Current_Role':
      return {
        ...state,
        admin:action.payload.admin,
        squad:action.payload.squad
      }
      default: return state
    }
  }
  export default CurrentRoleReducer
  