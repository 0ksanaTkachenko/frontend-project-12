import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannels, setSelectedChannelId } from '../../store/slices/channelsSlice';
import { useSelector } from 'react-redux';
import { addMessage, fetchMessages } from '../../store/slices/messagesSlice';
import socket from '../../socket';
import { addSocketMessage } from '../../store/slices/messagesSlice';


const renderStatus = (status, content, errMessage) => {
  const statuses = {
    loading: <div>Loading...</div>,
    failed: <div style={{ color: 'red' }}>{errMessage}</div>,
    idle: content,
  };

  return statuses[status];
};

const Channels = ({ token, selectedChannelId }) => {
  const dispatch = useDispatch();
  const chatChannels = useSelector((state) => state.channels);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchChannels(token));
    }
  }, [token, dispatch]);

  const channelsList = (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {Object.values(chatChannels.entities).map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <button
            onClick={() => dispatch(setSelectedChannelId(channel.id))}
            type="button"
            className={`w-100 rounded-0 text-start btn ${
              selectedChannelId === channel.id ? 'btn-secondary' : ''
            }`}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
  
  return renderStatus(chatChannels.loadingStatus, channelsList, 'Ошибка загрузки каналов');
}

const MessageForm = ({token, selectedChannelId}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const loadingStatus = useSelector((state) => state.messages.loadingStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      body: message.trim(),
      channelId: selectedChannelId,
      username: 'admin', 
    };

    dispatch(addMessage({ token, newMessage }));
    setMessage('')
  };

  return (
    <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <div className="input-group has-validation">
        <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit" disabled={loadingStatus === 'loading'} className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
      {renderStatus(loadingStatus, null, 'Не удалось отправить сообщение')}
    </form>
  )
}


const Message = React.memo(({message}) => {
  return (
    <div className="text-break mb-2">
      <b>admin</b>: {message.body}
      {console.log(message.id)}
    </div>
  );
})

const Messages = ({ token, channelMessages }) => {
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
      console.log("Соединение потеряно");
      // Возможно, стоит отобразить сообщение об ошибке или ожидании
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};









const ChatPage = () => {
  const token = localStorage.getItem('authToken')
  
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const selectedChannelName = useSelector((state) => {
    const selectedChannel = state.channels.entities[selectedChannelId];
    return selectedChannel ? selectedChannel.name : '';
  });

  const messages = useSelector((state) => state.messages);
  const channelMessages = Object.values(messages.entities)
  .filter((msg) => msg.channelId === selectedChannelId);

  return (
    <>
      <div className='h-100 d-flex'>
        <div className='container my-4 overflow-hidden rounded shadow'>
          <div className='row bg-white flex-md-row h-100'>
            <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <Channels token={token} selectedChannelId={selectedChannelId} />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b># {selectedChannelName}</b>
                  </p>
                  <span className="text-muted">{channelMessages.length} сообщений</span>
                </div>
                <Messages token={token} channelMessages={channelMessages}/>
                <div className="mt-auto px-5 py-3">
                  <MessageForm token={token} selectedChannelId={selectedChannelId}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
   

export default ChatPage