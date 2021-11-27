import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentServer: {
    id:null,
    name:'',
    email:'',
    home:true
  },
  servers:[],
};


export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setCurrentServer: (state,action) => {
      state.currentServer.id=action.payload.id;
      state.currentServer.name=action.payload.name;
      state.currentServer.email=action.payload.email;
      state.currentServer.home=action.payload.home
    },
    setServers:(state,action)=>{
      state.servers=action.payload
    }
  },
});

export const { setCurrentServer,setServers } = serverSlice.actions;
export default serverSlice.reducer;