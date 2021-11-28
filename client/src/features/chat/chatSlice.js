import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages:[]
};
export const fetchMessagesByChannel = createAsyncThunk(
  "/api/servers/channels/messages",
  async(msgId) =>{
      const {data}=await axios.post('/api/servers/channels/messages',{_id:msgId});
      return data;
    }
);


export const chatSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
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

export default chatSlice.reducer;