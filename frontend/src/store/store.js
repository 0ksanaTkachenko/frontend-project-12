import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/authSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

const store = configureStore({
  reducer: {
    auth: loginReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;
