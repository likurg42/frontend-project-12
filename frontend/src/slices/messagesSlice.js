import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChatData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'channels',
  initialState: messagesAdapter.getInitialState({}),
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      messagesAdapter.setAll(state, channels);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const getMessages = (state) => selectors.selectAll(state);
export const getChannelMessages = (id) => (state) => getMessages(state)
  .filter(({ channelId }) => id === channelId);

export default messagesSlice.reducer;
