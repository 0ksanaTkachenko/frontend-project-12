import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  const response = await axios.post('/api/v1/login', userData);
  return response.data;
});

const initialState = {
  username: null,
  token: null,
  loadingStatus: 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default loginSlice.reducer;
