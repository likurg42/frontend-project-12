import React, {
  useCallback,
  useContext, useMemo,
} from 'react';

export const ChatContext = React.createContext({});
const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ socket, children }) => {
  const sendMessage = useCallback((body, channelId, username, cb) => {
    socket.emit('newMessage', { body, channelId, username }, cb);
  }, [socket]);

  const providerValue = useMemo(
    () => ({ sendMessage }),
    [sendMessage],
  );

  return <ChatContext.Provider value={providerValue}>{children}</ChatContext.Provider>;
};

export default useChatContext;
