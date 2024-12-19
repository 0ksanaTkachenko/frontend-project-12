import socket from '@src/socket';
import { fetchChannels, setSelectedChannelId, addSocketChannel, addChannel, editChannel, removeSocketChannel, removeChannel, updateSocketChannel } from '@slices/channelsSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as bootstrap from 'bootstrap'
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { renderContent } from '@components/helpers';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';


const Channel = React.memo(({ channel, selectedChannelId }) => {
  const dispatch = useDispatch();
  console.log(channel)
 
  const RemovableChannel = ({ channel, selectedChannelId }) => (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        className={`w-100 rounded-0 text-start text-truncate no-hover ${
          selectedChannelId === channel.id ? 'btn-secondary' : 'btn-light'
        }`}
        onClick={() => dispatch(setSelectedChannelId(channel.id))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        className={`dropdown-toggle-split ${
          selectedChannelId === channel.id ? 'btn-secondary' : 'btn-light'
        }`}
        id={`dropdown-${channel.id}`}
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item data-action="delete" data-id={channel.id}>Удалить</Dropdown.Item>
          <Dropdown.Item data-action="rename" data-id={channel.id}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );

  const DefaultChannel = ({ channel,  selectedChannelId }) => (
    <button type="button"
      onClick={() => dispatch(setSelectedChannelId(channel.id))}
      className={`w-100 rounded-0 text-start btn ${
        selectedChannelId === channel.id ? 'btn-secondary' : 'btn-light'
      }`}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  return (
    <li className="nav-item w-100">
      {channel.removable ? (
        <RemovableChannel channel={channel} selectedChannelId={selectedChannelId} />
      ) : (
        <DefaultChannel channel={channel} selectedChannelId={selectedChannelId}/>
      )}
    </li>
  );
});
Channel.displayName = "Channel";

export const Channels = ({ token, chatChannels }) => {
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(chatChannels.loadingStatus);
  const selectedChannelId = chatChannels.selectedChannelId

  useEffect(() => {
    if (token) {
      dispatch(fetchChannels(token));
    }
        
    socket.emit('authenticate', { token });
    socket.on('newChannel', (payload) => {
      dispatch(addSocketChannel(payload));
      setConnection('idle');
    });
    socket.on('renameChannel', (payload) => {
      dispatch(updateSocketChannel(payload))
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeSocketChannel(payload))
    });
    socket.on('disconnect', () => setConnection('failed'));

    return () => {
      socket.off('newChannel');
      socket.off('disconnect');
      socket.off('renameChannel');
    };
  }, [token, dispatch]);

  const channels = (
    <>
      {Object.values(chatChannels.entities).map((channel) => (
        <Channel token={token} key={channel.id} channel={channel} selectedChannelId={selectedChannelId} />
      ))}
    </>
  );

  return renderContent(connection, channels, 'Ошибка загрузки каналов');
}

// Forms

const ChannelForm = ({ isOpen, onClose, chatChannels, title, onSubmit, initialValues }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const existingChannelNames = Object.values(chatChannels.entities).map((channel) => channel.name);

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, 'Название канала должно содержать не менее 3 символов')
      .max(20, 'Название канала должно содержать не более 20 символов')
      .required('Название канала обязательно')
      .notOneOf(existingChannelNames, 'Канал уже существует'),
  });

  useEffect(() => {
    const modalElement = modalRef.current;
    const modalInstance = new bootstrap.Modal(modalElement, {
      backdrop: true,
      keyboard: true,
    });

    const handleShown = () => {
      inputRef.current?.focus();
      inputRef.current.select()
    };

    modalElement.addEventListener('shown.bs.modal', handleShown);

    if (isOpen) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }

    return () => {
      modalElement.removeEventListener('shown.bs.modal', handleShown);
      modalInstance.hide();
    };
  }, [isOpen]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
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
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <Field
                      id="channelName"
                      name="channelName"
                      type="text"
                      placeholder="Введите имя канала"
                      innerRef={inputRef}
                      className={`form-control ${
                        errors.channelName && touched.channelName ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      disabled={chatChannels.loadingStatus === 'loading'}
                      className="btn btn-primary"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export const CreateChannelForm = ({ onClose, token, chatChannels, isOpen }) => {
  const dispatch = useDispatch();
  const initialValues = {
    channelName: '',
  };
  
  const handleSubmit = async (values) => {
    const newChannel = { name: values.channelName.trim() };
    const response = await dispatch(addChannel({ token, newChannel })).unwrap();
    dispatch(setSelectedChannelId(response.id));
    onClose()
  };

  return (
    <ChannelForm
      chatChannels={chatChannels}
      isOpen={isOpen}
      title="Добавить канал"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export const EditChannelForm = ({ token, channelId, onClose, isOpen, chatChannels }) => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    channelName: '',
  });

  useEffect(() => {
    if (isOpen) {
      const channelName = chatChannels.entities[channelId]?.name || '';
      setInitialValues({ channelName }); 
    }
  }, [isOpen, channelId, chatChannels]);

  const handleSubmit = async (values) => {
    const editedChannel = { name: values.channelName.trim() };
    await dispatch(editChannel({ token, channelId, editedChannel }))
    onClose(); 
  };
  
  return (
    <ChannelForm
      chatChannels={chatChannels}
      isOpen={isOpen}
      title="Редактировать канал"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export const RemoveChannelForm = ({ token, channelId, onClose, isOpen, chatChannels}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const modalInstance = new bootstrap.Modal(modalRef.current, {
      backdrop: true,
      keyboard: true,
    });
  
    if (isOpen) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }
  
    return () => {
      modalInstance.hide();
    };
  }, [isOpen]);

  const handleRemove = async () => {
    await dispatch(removeChannel({ token, channelId }))
    onClose()
  };
  
  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Удалить канал</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>Отменить</button>
              <button type="button" className="btn btn-danger" disabled={chatChannels.loadingStatus === 'loading'} onClick={handleRemove}>Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};