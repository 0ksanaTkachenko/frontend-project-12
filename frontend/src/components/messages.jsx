import socket from '@src/socket';
import { addMessage, fetchMessages, addSocketMessage } from '@slices/messagesSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { t } from '@src/i18n';
import { addNotification } from '@slices/notificationsSlice';

const Message = React.memo(({ message }) => {
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>: {message.body}
    </div>
  );
})
Message.displayName = "Message";

export const Messages = ({ token, channelMessages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchMessages(token));
    }

    socket.emit('authenticate', { token });
    socket.on('newMessage', (message) => {
      dispatch(addSocketMessage(message));
    });
    socket.on('disconnect', () => {
      dispatch(
        addNotification({
          message: t('notifications.disconnect'),
          type: 'error',
          icon: '❌',
        }),
      );
    });

    return () => {
      socket.off('newMessage');
      socket.off('disconnect');
    };
  }, [token, dispatch]);

  return  (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}          
    </div>
  )
};

export const MessageForm = ({ token, selectedChannelId }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.messages.loadingStatus);
  const username = useSelector((state) => state.auth.username);
  
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.body.trim()) return;
    const newMessage = {
      body: values.body.trim(),
      channelId: selectedChannelId,
      username,
    };
  
    await dispatch(addMessage({ token, newMessage }));
    resetForm()
  };
  
  return (
    <div className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
        {() => (
          <Form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field autoFocus={true} name="body" aria-label={t('messages.newMessage')} placeholder={t('messages.enterMessage')} className="border-0 p-0 ps-2 form-control"/>
              <button type="submit" disabled={loadingStatus === 'loading'} className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                 <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                </svg>
                <span className="visually-hidden">{t('general.send')}</span>
              </button>
              {loadingStatus === 'failed' && (
                <div className="text-danger mt-2">{t('errors.sendMessageError')}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}  