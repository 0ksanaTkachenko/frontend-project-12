import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { closeModal } from '@slices/uiSlice';
import ChannelForm from '@components/forms/channelForm';
import commonActions from '@utils/commonActions';

const ChatModal = ({ chatChannels, chatContainerRef, inputMessagesRef }) => {
  const dispatch = useDispatch();
  const { isOpened, action, activeChannelId } = useSelector((state) => state.ui.modal);
  const inputChatRef = useRef(null);

  const actionInfo = commonActions(action, activeChannelId, chatChannels, chatContainerRef);

  const handleClose = () => {
    dispatch(closeModal());
    setTimeout(() => {
      inputMessagesRef.current.focus();
    }, 200);
  };

  return ReactDOM.createPortal(
    <Modal show={isOpened} onHide={handleClose} centered>
      <ChannelForm
        actionInfo={actionInfo}
        onHide={handleClose}
        action={action}
        inputChatRef={inputChatRef}
        chatChannels={chatChannels}
      />
    </Modal>,
    document.getElementById('modal-root'),
  );
};

export default ChatModal;
