import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotifications } from '../store/slices/notificationsSlice';

const NotificationManager = () => {
const dispatch = useDispatch();
const notifications = useSelector((state) => state.notification);
  
    useEffect(() => {
      notifications.forEach((notification) => {
        toast[notification.type || 'info'](notification.message, {
          icon: notification.icon || 'ℹ️',
          position: 'top-right',
          className: 'custom-toast',
          progressClassName: 'custom-progress',
        });
      });
  
      if (notifications.length > 0) {
        dispatch(resetNotifications());
      }
      
    }, [notifications, dispatch]);
  
    return <ToastContainer />;
};

export default NotificationManager