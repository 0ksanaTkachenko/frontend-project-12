import {
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import Channels from '@components/channels';
import Messages from '@components/messages';
import { t } from '@utils/i18n';
import {
  setSelectedChannelId,
  fetchChannels,
} from '@slices/channelsSlice';
import { fetchMessages } from '@slices/messagesSlice';
import addImg from '@assets/add-icon.svg';
import MessageForm from '@components/forms/messageForm';
import ChatModal from '@components/chatModal';
import { showModal } from '@slices/uiSlice';

const ChatPage = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels(token));
    dispatch(fetchMessages(token));
  }, [dispatch, token]);

  const chatContainerRef = useRef(null);
  const inputMessagesRef = useRef(null);

  const chatChannels = useSelector((state) => state.channels);
  const { selectedChannelId } = chatChannels;
  const selectedChannelName = chatChannels.entities[selectedChannelId]?.name;
  const messages = useSelector((state) => state.messages);

  const channelMessages = useMemo(
    () => Object
      .values(messages.entities)
      .filter((msg) => msg.channelId === selectedChannelId),
    [messages.entities, selectedChannelId],
  );

  const handleChannelClick = (e) => {
    const { name, id, action } = e.target.dataset;

    if (name === 'channelBtn') {
      dispatch(setSelectedChannelId(id));
    }

    if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
      dispatch(showModal({ action, id }));
    }
  };

  return (
    <>
      <div className="h-100 d-flex">
        <div className="container my-4 overflow-hidden rounded shadow">
          <div className="row bg-white flex-md-row h-100">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('channels.channels')}</b>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={handleChannelClick}
                >
                  <img src={addImg} alt="add-icon" data-action="add" />
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ul
                role="listbox"
                onClick={handleChannelClick}
                id="channels-box"
                ref={chatContainerRef}
                className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                onKeyDown={(e) => {
                  const { name, id } = e.target.dataset;
                  if ((e.key === 'Enter' || e.key === ' ') && name === 'channelBtn') {
                    handleChannelClick(id);
                  }
                }}
              >
                <Channels chatChannels={chatChannels} />
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      #
                      <br />
                      {selectedChannelName}
                    </b>
                  </p>
                  <span className="text-muted">
                    {t('messages.messages', { count: channelMessages.length })}
                  </span>
                </div>
                <Messages channelMessages={channelMessages} messages={messages} />
                <MessageForm
                  token={token}
                  selectedChannelId={selectedChannelId}
                  inputRef={inputMessagesRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatModal
        inputMessagesRef={inputMessagesRef}
        chatChannels={chatChannels}
        chatContainerRef={chatContainerRef}
      />
    </>
  );
};

export default ChatPage;
