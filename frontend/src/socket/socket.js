import { io } from 'socket.io-client';
import store from '../slices';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel, changeCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import routes from '../routes/routes.js';

const initSocket = () => {
  const socket = io();

  socket.on('connect', () => {
    socket.on(routes.socket.newMessage(), (payload) => {
      store.dispatch(addMessage(payload));
    });

    socket.on(routes.socket.newChannel(), (payload) => {
      store.dispatch(addChannel(payload));
    });

    socket.on(routes.socket.removeChannel(), (payload) => {
      const { id } = payload;
      const { currentChannelId } = store.getState().channels;

      if (currentChannelId === id) {
        store.dispatch(changeCurrentChannel(1));
      }

      store.dispatch(removeChannel(id));
    });

    socket.on(routes.socket.renameChannel(), (payload) => {
      const { id, name } = payload;
      store.dispatch(renameChannel({ id, changes: { name } }));
    });
  });

  return socket;
};

export default initSocket;
