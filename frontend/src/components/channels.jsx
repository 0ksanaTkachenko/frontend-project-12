import React from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { t } from '@utils/i18n';

const RemovableChannel = React.memo(({ channel, selectedChannelId }) => (
  <Dropdown as={ButtonGroup} className="w-100">
    <Button
      data-id={channel.id}
      data-name="channelBtn"
      className={`w-100 rounded-0 text-start text-truncate no-hover ${
        selectedChannelId === channel.id ? 'btn-secondary' : 'btn-light'
      }`}
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
      <span className="visually-hidden">{t('channels.manageChannel')}</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item data-action="delete" data-id={channel.id}>
        {t('general.delete')}
      </Dropdown.Item>
      <Dropdown.Item data-action="rename" data-id={channel.id}>
        {t('general.rename')}
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
));
RemovableChannel.displayName = 'RemovableChannel';

const DefaultChannel = React.memo(({ channel, selectedChannelId }) => (
  <button
    type="button"
    data-id={channel.id}
    data-name="channelBtn"
    className={`w-100 rounded-0 text-start btn ${
      selectedChannelId === channel.id ? 'btn-secondary' : 'btn-light'
    }`}
  >
    <span className="me-1">#</span>
    {channel.name}
  </button>
));
DefaultChannel.displayName = 'DefaultChannel';

const Channel = React.memo(({ channel, selectedChannelId }) => {
  return (
    <li className="nav-item w-100">
      {channel.removable ? (
        <RemovableChannel
          channel={channel}
          selectedChannelId={selectedChannelId}
        />
      ) : (
        <DefaultChannel
          channel={channel}
          selectedChannelId={selectedChannelId}
        />
      )}
    </li>
  );
});
Channel.displayName = 'Channel';

const Channels = ({ chatChannels }) => {
  const { selectedChannelId } = chatChannels;

  return (
    <>
      {Object.values(chatChannels.entities).map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          selectedChannelId={selectedChannelId}
        />
      ))}
    </>
  );
};

export default Channels;
