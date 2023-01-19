import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';

const socket = io();

socket.on('connect', () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
});

export default socket;
