import { configureStore } from '@reduxjs/toolkit';
import serverSlice from '../features/sidebar/Server/components/serverSlice';
import logger from 'redux-logger';
import channelSlice from '../features/sidebar/Channel/channelSlice';

export const store = configureStore({
  reducer: {
    server: serverSlice,
    channel:channelSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
