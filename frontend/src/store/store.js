import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/authSlice';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import notificationReducer from './slices/notificationsSlice';
import notificationMiddleware from './notificationMiddleware';
import profanityMiddleware from './profanityMiddleware';
import socketMiddleware from './socketMiddleware';

const store = configureStore({
  reducer: {
    auth: loginReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware)
      .concat(notificationMiddleware)
      .concat(profanityMiddleware),
});

export default store;
