import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/authSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import notificationReducer from './slices/notificationsSlice.js';
import notificationMiddleware from './middleware.js';
import profanityMiddleware from './profanityMiddleware.js';

const store = configureStore({
  reducer: {
    auth: loginReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationMiddleware).concat(profanityMiddleware),
});

export default store;
