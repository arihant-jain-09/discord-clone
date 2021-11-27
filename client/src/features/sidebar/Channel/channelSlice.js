import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: {
    id:null,
    name:'',
    email:'',
  },
};


export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannel: (state,action) => {
      state.currentChannel.id=action.payload.id;
      state.currentChannel.name=action.payload.name;
      state.currentChannel.email=action.payload.email;
    },
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;