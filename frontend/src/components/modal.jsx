import React, { useEffect, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { t } from '@src/i18n';
import {
  setSelectedChannelId,
  addChannel,
  editChannel,
  removeChannel,
} from '@slices/channelsSlice';
import { scroll } from './helpers';

const ModalContent = ({
  onClose,
  chatChannels,
  token,
  chatContainerRef,
  action,
  editChannelId,
}) => {
  const dispatch = useDispatch();

  const commonActions = {
    add: {
      title: t('channels.addChannel'),
      submitBtnTitle: t('general.send'),
      initialChanelName: '',
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
      initialChanelName: chatChannels.entities[editChannelId]?.name,
      onSubmit: async (values) => {
        const editedChannel = { name: values.channelName.trim() };
        await dispatch(editChannel({ token, editChannelId, editedChannel }));
      },
    },
    delete: {
      title: t('channels.deleteChannel'),
      submitBtnTitle: t('general.delete'),
      initialChanelName: '',
      onSubmit: async () => {
        await dispatch(removeChannel({ token, editChannelId }));
        scroll('top', chatContainerRef);
      },
    },
  };

  const { title, submitBtnTitle, initialChanelName, onSubmit } =
    commonActions[action];

  const existingChannelNames = Object.values(chatChannels.entities).map(
    (channel) => channel.name,
  );
  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, t('validation.nameMinMax'))
      .max(20, t('validation.nameMinMax'))
      .required(t('validation.channelNameRequired'))
      .notOneOf(existingChannelNames, t('validation.channelNameExists')),
  });

  const deleteForm = (
    <Formik
      initialValues={{}}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (_, { resetForm }) => {
        await onSubmit(); // Выполняем удаление
        resetForm();
        onClose(); // Закрываем модальное окно
      }}
    >
      {({ resetForm }) => (
        <Form>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                resetForm();
                onClose();
              }}
            />
          </div>
          <div className="modal-body">
            <p className="lead">{t('general.areYouSure')}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              {t('general.cancel')}
            </button>
            <button type="submit" className="btn btn-danger">
              {submitBtnTitle}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );

  if (action === 'delete') {
    return deleteForm;
  }

  return (
    <Formik
      initialValues={{ channelName: initialChanelName || '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {({ errors, touched, resetForm }) => (
        <Form>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                resetForm();
                onClose();
              }}
            />
          </div>
          <div className="modal-body">
            <Field
              id="channelName"
              name="channelName"
              type="text"
              className={`form-control ${
                errors.channelName && touched.channelName ? 'is-invalid' : ''
              }`}
            />
            <ErrorMessage
              name="channelName"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              {t('general.cancel')}
            </button>
            <button
              type="submit"
              className={`btn ${action === 'delete' ? 'btn-danger' : 'btn-primary'}`}
            >
              {submitBtnTitle}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Modal = ({
  isOpen,
  onClose,
  chatChannels,
  token,
  chatContainerRef,
  action,
  editChannelId,
}) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalInstance.current) {
      modalInstance.current = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
    }

    const handleHidden = () => {
      onClose();
    };

    modalElement.addEventListener('hidden.bs.modal', handleHidden);

    if (isOpen) {
      modalInstance.current.show();
    } else {
      modalInstance.current.hide();
    }

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={modalRef}
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {action && (
            <ModalContent
              onClose={onClose}
              chatChannels={chatChannels}
              token={token}
              chatContainerRef={chatContainerRef}
              action={action}
              editChannelId={editChannelId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
