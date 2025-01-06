import { addNotification } from '@slices/notificationsSlice';
import { io } from 'socket.io-client';
import { t } from '@src/i18n';
import { fetchMessages, addSocketMessage } from '@slices/messagesSlice';
import {
  fetchChannels,
  addSocketChannel,
  removeSocketChannel,
  updateSocketChannel,
} from '@slices/channelsSlice';

let socket = null;
let isDisconnected = false;

const socketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'socket_connect': {
      const token = localStorage.getItem('authToken');
      if (socket || !token) {
        return;
      }

      store.dispatch(fetchChannels(token));
      store.dispatch(fetchMessages(token));

      socket = io('http://localhost:5001', {
        transports: ['websocket'],
      });
      socket.emit('authenticate', { token });

      socket.on('newChannel', (payload) => {
        store.dispatch(addSocketChannel(payload));
      });
      socket.on('renameChannel', (payload) => {
        store.dispatch(updateSocketChannel(payload));
      });
      socket.on('removeChannel', (payload) => {
        store.dispatch(removeSocketChannel(payload));
      });
      // socket.on('newMessage', (message) => {
      //   store.dispatch(addSocketMessage(message));
      // });
      socket.on('disconnect', () => {
        isDisconnected = true;

        setTimeout(() => {
          if (isDisconnected) {
            store.dispatch(
              addNotification({
                message: t('notifications.disconnect'),
                type: 'error',
                icon: '❌',
              }),
            );
          }
        }, 3000);
      });
      // socket.on('connect', () => {
      //   isDisconnected = false;
      // });

      socket.on('connect', () => {
        isDisconnected = false;
        console.log('Socket connected, registering event listeners');
        socket.on('newMessage', (message) => {
          store.dispatch(addSocketMessage(message));
        });
      });

      socket.onAny((event, ...args) => {
        console.log(`[Socket Event]: ${event}`, args);
      });

      break;
    }

    case 'socket_disconnect': {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
