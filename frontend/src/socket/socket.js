import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, changeChannel } from '../slices/channelsSlice.js';

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
});

export default socket;
