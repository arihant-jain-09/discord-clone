const currentserver=(server)=>{
    return{
    type:'Current_Server',
    payload:server
  }
  }
  export default currentserver;

  export const deleteServer=(server)=>{
    return{
      type:'Delete_Server_Start',
      payload:server
    }
  }

