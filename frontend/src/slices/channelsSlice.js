import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes.js';

export const fetchChatData = createAsyncThunk(
  'channel/fetchChatData',
  async (headers) => {
    const response = await axios.get(routes.api.data, { headers });
    const { data } = response;
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: 1,
    loadingStatus: 'idle',
    loadingError: null,
  }),
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.pending, (state) => {
      state.loadingStatus = 'loading';
      state.loadingError = null;
    }).addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      channelsAdapter.setAll(state, channels);
      state.loadingStatus = 'idle';
      state.loadingError = null;
    }).addCase(fetchChatData.rejected, (state, { error }) => {
      state.loadingStatus = 'failed';
      state.loadingError = error;
    });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);
export const getChannelsNames = (state) => getChannels(state).map(({ name }) => name);
export const getCurrentChannel = (state) => getChannels(state)
  .find(({ id }) => id === state.channels.currentChannelId);

export const { changeChannel, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
