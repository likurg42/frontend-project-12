import React, {
  useCallback,
  useMemo,
} from 'react';
import routes from '../routes/routes.js';

const ChatContext = React.createContext({});

export const ChatProvider = ({ socket, children }) => {
  const promisifyEmitEvents = useCallback((event, arg) => new Promise((resolve, reject) => {
    socket
      .timeout(5000)
      .emit(event, arg, (err, res) => (res.status !== 'ok' || err ? reject(err) : resolve(res.data)));
  }), [socket]);

  const sendMessage = useCallback((
    body,
    channelId,
    username,
  ) => promisifyEmitEvents(routes.socket.newMessage(), {
    body,
    channelId,
    username,
  }), [promisifyEmitEvents]);

  const createChannel = useCallback((name) => promisifyEmitEvents(routes.socket.newChannel(), {
    name,
  }), [promisifyEmitEvents]);

  const removeChannel = useCallback((id) => promisifyEmitEvents(routes.socket.removeChannel(), {
    id,
  }), [promisifyEmitEvents]);

  const renameChannel = useCallback((
    name,
    id,
  ) => promisifyEmitEvents(routes.socket.renameChannel(), {
    name,
    id,
  }), [promisifyEmitEvents]);

  const providerValue = useMemo(
    () => ({
      sendMessage, createChannel, removeChannel, renameChannel,
    }),
    [sendMessage, createChannel, removeChannel, renameChannel],
  );

  return <ChatContext.Provider value={providerValue}>{children}</ChatContext.Provider>;
};

export default ChatContext;
