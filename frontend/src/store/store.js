import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@slices/authSlice';
import channelsReducer from '@slices/channelsSlice';
import messagesReducer from '@slices/messagesSlice';
import notificationReducer from '@slices/notificationsSlice';
import uiReducer from '@slices/uiSlice';
import notificationMiddleware from '@store/notificationMiddleware';
import profanityMiddleware from '@store/profanityMiddleware';
import socketMiddleware from '@store/socketMiddleware';

const store = configureStore({
  reducer: {
    auth: loginReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    notification: notificationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware)
      .concat(notificationMiddleware)
      .concat(profanityMiddleware),
});

export default store;
