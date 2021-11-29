import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages:[]
};
export const fetchMessagesByChannel = createAsyncThunk(
  "/api/servers/channels/messages",
  async(channelId) =>{
      const {data}=await axios.post('/api/servers/channels/messages',{_id:channelId});
      return data;
    }
);

export const AddMessage = createAsyncThunk(
  "/api/servers/channels/messages/add",
  async(message,{getState} ) =>{
      const state = getState(); 
      const currentChannel=state.channel.currentChannel;
      const {data}=await axios.post('/api/servers/channels/messages/add',{message,channel:currentChannel});
      return data;
    }
);


export const chatSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    SocketIOmessageSet: (state,action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChannel.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchMessagesByChannel.fulfilled, (state, action) => {
        state.messages=action.payload;
      })      
  },
});
export const { SocketIOmessageSet } = chatSlice.actions;
export default chatSlice.reducer;