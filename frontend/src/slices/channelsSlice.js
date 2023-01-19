import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const fetchChannelsData = createAsyncThunk(
  'channel/fetchchannelData',
  async (headers) => {
    const response = await axios.get(routes.api.data, { headers });
    const { data } = response;
    const { channels } = data;
    return channels;
  },
);

const channelsAdapter = createEntityAdapter();

const channelSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: 1,
    loadingStatus: 'idle',
    loadingError: null,
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchChannelsData.pending, (state) => {
      state.loadingStatus = 'loading';
      state.loadingError = null;
    }).addCase(fetchChannelsData.fulfilled, (state, { payload }) => {
      channelsAdapter.setAll(state, payload);
      state.loadingStatus = 'idle';
      state.loadingError = null;
    }).addCase(fetchChannelsData.rejected, (state, { error }) => {
      state.loadingStatus = 'failed';
      state.loadingError = error;
    });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);

export default channelSlice.reducer;
