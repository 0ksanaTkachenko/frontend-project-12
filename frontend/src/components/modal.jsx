import React, { useEffect, useRef, useMemo } from 'react';
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

const ChannelForm = ({
  action,
  title,
  initialChannelName = '',
  onSubmit,
  validationSchema,
  onClose,
  submitBtnTitle,
  setFormReset,
}) => {
  return (
    <Formik
      initialValues={{ channelName: initialChannelName }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {({ errors, touched, resetForm }) => {
        useEffect(() => {
          if (setFormReset) {
            setFormReset(resetForm);
          }
        }, [setFormReset, resetForm]);

        return (
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
              {action !== 'delete' && (
                <>
                  <Field
                    id="channelName"
                    name="channelName"
                    type="text"
                    className={`form-control ${
                      errors.channelName && touched.channelName
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="channelName"
                    component="div"
                    className="invalid-feedback"
                  />
                </>
              )}
              {action === 'delete' && (
                <p className="lead">{t('general.areYouSure')}</p>
              )}
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
                className={`btn ${
                  action === 'delete' ? 'btn-danger' : 'btn-primary'
                }`}
              >
                {submitBtnTitle}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const ModalContent = ({
  onClose,
  chatChannels,
  token,
  chatContainerRef,
  action,
  editChannelId,
  setFormReset,
}) => {
  const dispatch = useDispatch();
  const selectedChannelId = chatChannels.selectedChannelId;

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
    />
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
  const formResetRef = useRef(() => {});

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalInstance.current) {
      modalInstance.current = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
    }

    const handleHidden = () => {
      formResetRef.current();
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
              setFormReset={(reset) => (formResetRef.current = reset)} // Передаем функцию сброса
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
