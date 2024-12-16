import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (token) => {
  const response = await axios.get('/api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    loadingStatus: 'idle',
    error: null,
    selectedChannelId: '1',
  }),
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.selectedChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllChannels,
  // selectById: selectChannelById,
  // selectEntities: selectChannelEntities,
  // selectIds: selectChannelIds,
} = channelsAdapter.getSelectors((state) => state.channels);

export const { setSelectedChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
