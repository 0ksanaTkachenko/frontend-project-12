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

export const addChannel = createAsyncThunk('channels/addChannel', async ({ token, newChannel }) => {
  const response = await axios.post('/api/v1/channels', newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ token, channelId, editedChannel }) => {
    const response = await axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, channelId }) => {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    loadingStatus: 'idle',
    error: null,
    selectedChannelId: '1',
    notification: {
      isAddChannelOpen: false,
    },
  }),
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.selectedChannelId = action.payload;
    },
    addSocketChannel: (state, action) => {
      channelsAdapter.addOne(state, action.payload);
    },
    updateSocketChannel: (state, action) => {
      channelsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removeSocketChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id);
      if (state.selectedChannelId === action.payload.id) {
        state.selectedChannelId = '1';
      }
    },
    resetAddNotification: (state) => {
      state.notification.isAddChannelOpen = false;
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
        state.error = action.error;
      })

      .addCase(addChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(editChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(editChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedChannelId,
  addSocketChannel,
  updateSocketChannel,
  removeSocketChannel,
  resetAddNotification,
} = channelsSlice.actions;
export default channelsSlice.reducer;
