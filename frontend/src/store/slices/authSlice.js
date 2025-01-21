import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await axios.post('/api/v1/login', userData);
    return response.data;
  },
);

export const createNewUser = createAsyncThunk(
  'auth/createNewUser',
  async (newUser) => {
    const response = await axios.post('/api/v1/signup', newUser);
    return response.data;
  },
);

const initialState = {
  username: localStorage.getItem('username') || null,
  token: localStorage.getItem('authToken') || null,
  loadingStatus: 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { username, token } = action.payload;
        state.username = username;
        state.token = token;
        state.loadingStatus = 'idle';
        state.error = null;
        localStorage.setItem('username', username);
        localStorage.setItem('authToken', token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })

      .addCase(createNewUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        const { username, token } = action.payload;
        state.username = username;
        state.token = token;
        state.loadingStatus = 'idle';
        state.error = null;
        localStorage.setItem('username', username);
        localStorage.setItem('authToken', token);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
