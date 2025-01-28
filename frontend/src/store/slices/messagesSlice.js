/* eslint-disable no-param-reassign */
import {
 createAsyncThunk, createSlice, createEntityAdapter 
} from '@reduxjs/toolkit';
import axios from 'axios';
import { removeSocketChannel } from '@slices/channelsSlice';

const messagesAdapter = createEntityAdapter();

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (token) => {
  const response = await axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const addMessage = createAsyncThunk('messages/addMessage', async ({ token, newMessage }) => {
  const response = await axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    loadingStatus: 'idle',
    error: null,
    firstLoadingStatus: 'not loaded',
  }),
  reducers: {
    addSocketMessage: (state, action) => {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeSocketChannel, (state, action) => {
        const channelId = action.payload.id;
        const messagesToRemove = Object.values(state.entities)
          .filter((message) => message.channelId === channelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesToRemove);
      })

      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.firstLoadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.firstLoadingStatus = 'not loaded';
        state.error = action.error.message;
      })

      .addCase(addMessage.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addSocketMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
