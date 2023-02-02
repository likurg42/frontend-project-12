import React, {
  useCallback,
  useMemo,
} from 'react';
import routes from '../routes/routes.js';

const ChatContext = React.createContext({});

export const ChatProvider = ({ socket, children }) => {
  const sendMessage = useCallback((body, channelId, username, cb) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(routes.socket.newMessage(), { body, channelId, username }, (err, res) => {
          if (err) reject(err);
          resolve(cb(res));
        });
    },
  ), [socket]);

  const createChannel = useCallback((name, cb) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(routes.socket.newChannel(), { name }, (err, res) => {
          if (err) reject(err);
          resolve(cb(res));
        });
    },
  ), [socket]);

  const removeChannel = useCallback((id, cb) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(routes.socket.removeChannel(), { id }, (err, res) => {
          if (err) reject(err);
          resolve(cb(res));
        });
    },
  ), [socket]);

  const renameChannel = useCallback((name, id, cb) => new Promise(
    (resolve, reject) => {
      socket
        .timeout(5000)
        .emit(routes.socket.renameChannel(), { name, id }, (err, res) => {
          if (err) reject(err);
          resolve(cb(res));
        });
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
