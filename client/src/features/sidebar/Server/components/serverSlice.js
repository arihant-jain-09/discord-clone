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
};

export const addServer = createAsyncThunk(
  "/api/servers",
  (formData) =>
    axios.post('/api/servers',{
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServers.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.servers=action.payload;
      })      
  },
});

export const { setCurrentServer,setServers } = serverSlice.actions;
export default serverSlice.reducer;