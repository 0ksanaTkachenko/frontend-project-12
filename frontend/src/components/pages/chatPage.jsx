import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Channels, CreateChannelForm, EditChannelForm, RemoveChannelForm } from '@components/channels';
import { MessageForm, Messages } from '@components/messages';
import { t } from '@src/i18n';
import NotificationManager from '../notifications';



const ChatPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false); 
  const [editChannelId, setEditChannelId] = useState(null); 

  const token = useSelector((state) => state.auth.token);
  const chatChannels = useSelector((state) => state.channels);

  const selectedChannelId = chatChannels.selectedChannelId
  const selectedChannelName = chatChannels.entities[selectedChannelId]?.name;

  const messages = useSelector((state) => state.messages);
  const channelMessages = Object.values(messages.entities)
    .filter((msg) => msg.channelId === selectedChannelId);
  
  const handleChannelClick = (e) => {

    if (e.target.tagName !== 'A') {
      return
    }

    const action = e.target.dataset.action;
    const id = e.target.dataset.id;

    setEditChannelId(id);

    if (action === 'rename') {
      setEditModalOpen(true);
    }

    if (action === 'delete') {
      setRemoveModalOpen(true);
    }
  }

  return (
    <>
      <div className='h-100 d-flex'>
        <div className='container my-4 overflow-hidden rounded shadow'>
          <div className='row bg-white flex-md-row h-100'>
            <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('channels.channels')}</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ul onClick={handleChannelClick} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                <Channels token={token} chatChannels={chatChannels} />
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b># {selectedChannelName}</b>
                  </p>
                  <span className="text-muted">
                    {t('messages.messages', { count: channelMessages.length })}
                  </span>
                </div>
                <Messages token={token} channelMessages={channelMessages}/>
                <MessageForm token={token} selectedChannelId={selectedChannelId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateChannelForm token={token} isOpen={isModalOpen} chatChannels={chatChannels} onClose={() => setModalOpen(false)} />
      <EditChannelForm token={token} isOpen={isEditModalOpen} chatChannels={chatChannels} channelId={editChannelId} onClose={() => {
          setEditModalOpen(false);
          setEditChannelId(null); 
      }} />
      <RemoveChannelForm token={token} isOpen={isRemoveModalOpen}chatChannels={chatChannels} channelId={editChannelId} onClose={() => {
          setRemoveModalOpen(false);
          setEditChannelId(null); 
      }} />
      <NotificationManager/>
    </>
  );
}
   

export default ChatPage