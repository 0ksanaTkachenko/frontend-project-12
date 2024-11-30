import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/authSlice.js';
import channelsReducer from './slices/channelsSlice.js';

const store = configureStore({
  reducer: {
    auth: loginReducer,
    channels: channelsReducer,
  },
});

export default store;
