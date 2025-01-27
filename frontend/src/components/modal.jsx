import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as bootstrap from 'bootstrap';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { t } from '@src/i18n';
import {
  setSelectedChannelId,
  addChannel,
  editChannel,
  removeChannel,
} from '@slices/channelsSlice';
import scroll from '../utils/scroll';
import ChannelForm from './forms/ChannelForm';

const getValidationSchema = (action, existingChannelNames) => {
  if (action === 'delete') {
    return null;
  }

  return Yup.object({
    channelName: Yup.string()
      .min(3, t('validation.nameMinMax'))
      .max(20, t('validation.nameMinMax'))
      .required(t('validation.channelNameRequired'))
      .notOneOf(
        action === 'add' ? existingChannelNames : [],
        t('validation.channelNameExists'),
      ),
  });
};

const ModalContent = ({
  onClose,
  chatChannels,
  token,
  chatContainerRef,
  action,
  editChannelId,
  setFormReset,
  inputModalRef,
}) => {
  const dispatch = useDispatch();
  const { selectedChannelId } = chatChannels;

  const existingChannelNames = Object.values(chatChannels.entities).map(
    (channel) => channel.name,
  );

  const commonActions = {
    add: {
      title: t('channels.addChannel'),
      submitBtnTitle: t('general.send'),
      initialChannelName: '',
      onSubmit: async (values) => {
        const newChannel = { name: values.channelName.trim() };
        const response = await dispatch(
          addChannel({ token, newChannel }),
        ).unwrap();
        await dispatch(setSelectedChannelId(response.id));
        scroll('bottom', chatContainerRef);
      },
    },
    rename: {
      title: t('channels.editChannel'),
      submitBtnTitle: t('general.send'),
      initialChannelName: chatChannels.entities[editChannelId]?.name,
      onSubmit: async (values) => {
        const editedChannel = { name: values.channelName.trim() };
        await dispatch(editChannel({ token, editChannelId, editedChannel }));
      },
    },
    delete: {
      title: t('channels.deleteChannel'),
      submitBtnTitle: t('general.delete'),
      initialChannelName: '',
      onSubmit: async () => {
        await dispatch(removeChannel({ token, editChannelId }));
        if (editChannelId === selectedChannelId) {
          scroll('top', chatContainerRef);
        }
      },
    },
  };

  const { title, submitBtnTitle, initialChannelName, onSubmit } =
    commonActions[action];

  const validationSchema = getValidationSchema(action, existingChannelNames);

  return (
    <ChannelForm
      action={action}
      title={title}
      initialChannelName={initialChannelName}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onClose={onClose}
      submitBtnTitle={submitBtnTitle}
      setFormReset={setFormReset}
      inputModalRef={inputModalRef}
    />
  );
};

const Modal = ({
  isOpen,
  onClose,
  chatChannels,
  setModalOpen,
  token,
  chatContainerRef,
  action,
  editChannelId,
  inputRef,
}) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);
  const formResetRef = useRef(() => {});
  const inputModalRef = useRef(null);

  if (modalRef.current && !modalInstance.current) {
    modalInstance.current = new bootstrap.Modal(modalRef.current, {
      backdrop: true,
      keyboard: true,
      animation: false,
    });
  }

  useEffect(() => {
    const showModal = () => {
      modalInstance.current?.show();
      inputModalRef.current?.focus();
      inputModalRef.current?.select();
    };

    const hideModal = () => {
      modalInstance.current?.hide();
      inputRef?.current?.focus();
      setModalOpen(false);
    };

    if (isOpen) {
      showModal();
    } else {
      hideModal();
    }

    modalRef.current.addEventListener('hidden.bs.modal', hideModal);
    modalRef.current.addEventListener('shown.bs.modal', showModal);

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('hidden.bs.modal', hideModal);
        modalRef.current.removeEventListener('shown.bs.modal', showModal);
      }
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div ref={modalRef} className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <ModalContent
            inputModalRef={inputModalRef}
            onClose={onClose}
            chatChannels={chatChannels}
            token={token}
            chatContainerRef={chatContainerRef}
            action={action}
            editChannelId={editChannelId}
            setFormReset={(reset) => {
              formResetRef.current = reset;
            }}
          />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
