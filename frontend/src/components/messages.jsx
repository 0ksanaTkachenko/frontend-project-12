import React, {
  useEffect,
  useRef,
} from 'react'; 
import scroll from '@utils/scroll';

const Message = React.memo(({ message }) => (
  <div className="text-break mb-2">
    <b>{message.username}</b>
    <br />
    {message.body}
  </div>
));
Message.displayName = 'Message';

const Messages = ({ channelMessages, messages }) => {
  const containerRef = useRef(null);

  const isUserAtBottom = () => {
    if (!containerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const toleranceFactor = 1.5;
    const toleranceThreshold = clientHeight * toleranceFactor;
    return scrollHeight - scrollTop <= toleranceThreshold;
  };

  useEffect(() => {
    if (messages.firstLoadingStatus === 'loaded') {
      scroll('bottom', containerRef, 'auto');
    }
  }, [messages.firstLoadingStatus]);

  useEffect(() => {
    if (isUserAtBottom()) {
      scroll('bottom', containerRef);
    }
  }, [channelMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={containerRef}>
      {channelMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;