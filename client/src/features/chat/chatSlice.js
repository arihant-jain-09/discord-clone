import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages:[],
  messageFetchLoading:false,
  edit:null,
  hover:false
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

export const EditMessage = createAsyncThunk(
  "/api/servers/channels/messages/edit",
  async(message) =>{
      const {data}=await axios.post('/api/servers/channels/messages/edit',{message});
      return data;
    }
);

export const DeleteMessage = createAsyncThunk(
  "/api/servers/channels/messages/delete",
  async(msgId) =>{
      const {data}=await axios.post('/api/servers/channels/messages/delete',{_id:msgId});
      return data;
    }
);

export const PinMessage = createAsyncThunk(
  "/api/servers/channels/messages/pin",
  async(msg_Id,{getState}) =>{
      const state = getState(); 
      const currentChannel=state.channel.currentChannel;
      const {data}=await axios.post('/api/servers/channels/messages/pin',{msg_Id:msg_Id,channel_Id:currentChannel._id});
      return data;
    }
);

export const UnpinMessage = createAsyncThunk(
  "/api/servers/channels/messages/unpin",
  async(msg_Id,) =>{
      const {data}=await axios.post('/api/servers/channels/messages/unpin',{msg_Id:msg_Id});
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
    MsgToEdit:(state,action)=>{
      state.edit=action.payload;
    },
    EditMsg:(state,action)=>{
      const index=current(state.messages).findIndex((msg)=>msg._id===action.payload._id);
      state.messages[index]=action.payload;
      console.log(state.messages[index]);
    },
    DeleteMsg:(state,action)=>{
      state.messages=current(state.messages).filter((msg)=>msg._id!==action.payload._id);
    },
    PinMsg:(state,action)=>{
      const index=current(state.messages).findIndex((msg)=>msg._id===action.payload);
      state.messages[index]={...current(state.messages)[index],isPinned:true};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChannel.pending, (state) => {
        state.messageFetchLoading = true;
      })
      .addCase(fetchMessagesByChannel.fulfilled, (state, action) => {
        state.messages=action.payload;
        state.messageFetchLoading = false;
      })      
  },
});
export const { SocketIOmessageSet,MsgToEdit,EditMsg,DeleteMsg,PinMsg } = chatSlice.actions;
export default chatSlice.reducer;