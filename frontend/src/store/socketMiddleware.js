import { addNotification } from '@slices/notificationsSlice';
import { io } from 'socket.io-client';
import { t } from '@utils/i18n';
import { addSocketMessage } from '@slices/messagesSlice';
import {
  addSocketChannel,
  removeSocketChannel,
  updateSocketChannel,
} from '@slices/channelsSlice';

let socket = null;

const socketMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('authToken');

  if (!socket && token) {
    socket = io();

    socket.on('newChannel', (payload) => {
      store.dispatch(addSocketChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      store.dispatch(updateSocketChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      store.dispatch(removeSocketChannel(payload));
    });

    socket.on('newMessage', (message) => {
      store.dispatch(addSocketMessage(message));
    });

    socket.on('disconnect', () => {
      store.dispatch(
        addNotification({
          message: t('notifications.disconnect'),
          type: 'error',
          icon: '❌',
        }),
      );
    });
  }

  return next(action);
};

export default socketMiddleware;
