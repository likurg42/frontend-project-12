import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';

const store = configureStore({
  reducer: {
    channels: channelReducer,
  },
});

export default store;
