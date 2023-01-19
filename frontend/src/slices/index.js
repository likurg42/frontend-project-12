import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
});

export default store;
