import { io } from 'socket.io-client';
import store from '../slices';
import { addMessage } from '../slices/messagesSlice';

const socket = io();

socket.on('connect', () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
});

export default socket;
