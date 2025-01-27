import { t } from '@src/i18n';
import { addNotification } from './slices/notificationsSlice';

const notificationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'channels/addChannel/fulfilled':
      store.dispatch(
        addNotification({
          message: t('notifications.channelCreated'),
          type: 'success',
          icon: '✔️',
        }),
      );
      break;

    case 'channels/addChannel/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.channelCreationFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'channels/editChannel/fulfilled':
      store.dispatch(
        addNotification({
          message: t('notifications.channelRenamed'),
          type: 'success',
          icon: '✔️',
        }),
      );
      break;

    case 'channels/editChannel/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.channelRenameFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'channels/removeChannel/fulfilled':
      store.dispatch(
        addNotification({
          message: t('notifications.channelRemoved'),
          type: 'success',
          icon: '✔️',
        }),
      );
      break;

    case 'channels/removeChannel/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.channelRemoveFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'channels/fetchChannels/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.channelsFetchFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'messages/fetchChannels/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.messagesFetchFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'messages/addMessage/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.messageSendFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    case 'auth/createNewUser/rejected':
      store.dispatch(
        addNotification({
          message: t('notifications.registrationFailed'),
          type: 'error',
          icon: '❌',
        }),
      );
      break;

    default:
      break;
  }

  return next(action);
};

export default notificationMiddleware;
