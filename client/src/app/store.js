import { configureStore } from '@reduxjs/toolkit';
import serverSlice from '../features/sidebar/Server/components/serverSlice';
import logger from 'redux-logger';
import channelSlice from '../features/sidebar/Channel/channelSlice';
import authSlice from '../features/auth/authSlice';
import chatSlice from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    server: serverSlice,
    channel:channelSlice,
    message:chatSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
