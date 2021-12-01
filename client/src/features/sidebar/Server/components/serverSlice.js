import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  currentServer: {
    _id:null,
    server_name:'',
    img:'',
    home:true
  },
  servers:[],
  serverFetchLoading:false
};

export const addServer = createAsyncThunk(
  "/api/servers/add",
  (formData) =>
    axios.post('/api/servers/add',{
      formData
    })
      .then((response) => response.data)
      .catch((error) => error)
);

export const fetchServers = createAsyncThunk(
  "/api/servers",
  async() =>{
      const {data}=await axios.get('/api/servers');
      return data;
    }
);

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setCurrentServer: (state,action) => {
      state.currentServer._id=action.payload._id;
      state.currentServer.server_name=action.payload.server_name;
      state.currentServer.img=action.payload.img;
      state.currentServer.home=action.payload.home;
    },
    setServers:(state,action)=>{
      state.servers=action.payload
    },
    SocketIOserverSet:(state,action)=>{
      state.servers.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServers.pending, (state) => {
        state.serverFetchLoading = true;
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.servers=action.payload;
        state.serverFetchLoading = false;
      })      
  },
});

export const { setCurrentServer,setServers, SocketIOserverSet } = serverSlice.actions;
export default serverSlice.reducer;