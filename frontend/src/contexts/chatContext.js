import React, {
  useCallback,
  useMemo,
} from 'react';
import routes from '../routes/routes.js';

const ChatContext = React.createContext({});

export const ChatProvider = ({ socket, children }) => {
  const sendMessage = useCallback((body, channelId, username) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(
          routes.socket.newMessage(),
          { body, channelId, username },
          (err, res) => (err ? reject(err) : resolve(res)),
        );
    },
  ), [socket]);

  const createChannel = useCallback((name) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(
          routes.socket.newChannel(),
          { name },
          (err, res) => (err ? reject(err) : resolve(res)),
        );
    },
  ), [socket]);

  const removeChannel = useCallback((id) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(
          routes.socket.removeChannel(),
          { id },
          (err) => (err ? reject(err) : resolve()),
        );
    },
  ), [socket]);

  const renameChannel = useCallback((name, id) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(
          routes.socket.renameChannel(),
          { name, id },
          (err, res) => (err ? reject(err) : resolve(res)),
        );
    },
  ), [socket]);

  const providerValue = useMemo(
    () => ({
      sendMessage, createChannel, removeChannel, renameChannel,
    }),
    [sendMessage, createChannel, removeChannel, renameChannel],
  );

  return <ChatContext.Provider value={providerValue}>{children}</ChatContext.Provider>;
};

export default ChatContext;
