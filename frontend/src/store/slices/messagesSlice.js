import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

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
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addSocketMessage: (state, action) => {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
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

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export const { addSocketMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
