import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:null
};


export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state,action) => {
      state.user=action.payload
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;