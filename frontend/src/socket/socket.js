import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel, changeChannel, deleteChannel, updateChannel,
} from '../slices/channelsSlice.js';

const socket = io();

socket.on('connect', () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    const { id } = payload;
    store.dispatch(addChannel(payload));
    store.dispatch(changeChannel(id));
  });

  socket.on('removeChannel', (payload) => {
    const { id } = payload;

    store.dispatch(changeChannel(1));
    store.dispatch(deleteChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    store.dispatch(updateChannel({ id, changes: { name } }));
  });
});

export default socket;
