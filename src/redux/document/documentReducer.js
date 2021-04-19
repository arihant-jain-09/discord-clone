const initialState={
    id:'ofIRBMmGukI3EXPAYmgn',
    name:'Discordy'
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
  