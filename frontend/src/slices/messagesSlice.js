import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChatData, deleteChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'channels',
  initialState: messagesAdapter.getInitialState({}),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(deleteChannel, (state, { payload }) => {
        const filteredMessages = Object.values(state.entities)
          .filter(({ channelId }) => channelId === payload)
          .map((message) => message.id);

        messagesAdapter.removeMany(state, filteredMessages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const getMessages = (state) => selectors.selectAll(state);
export const getChannelMessages = (id) => (state) => getMessages(state)
  .filter(({ channelId }) => id === channelId);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
