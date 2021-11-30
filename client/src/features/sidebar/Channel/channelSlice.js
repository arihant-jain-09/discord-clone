import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentChannel: {
    _id:null,
    name:'',
    _message:null,
  },
  channels:[],
  ChannelFetchLoading:false
};
export const fetchChannelByServer = createAsyncThunk(
  "/api/servers/channels",
  async(channels) =>{
      const {data}=await axios.post('/api/servers/channels',{_channels:channels});
      return data;
    }
);


export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannel: (state,action) => {
      state.currentChannel._id=action.payload._id;
      state.currentChannel.name=action.payload.name;
      state.currentChannel._message=action.payload._message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelByServer.pending, (state) => {
        state.ChannelFetchLoading = true;
      })
      .addCase(fetchChannelByServer.fulfilled, (state, action) => {
        state.channels=action.payload;
        state.ChannelFetchLoading = false;
      })      
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;