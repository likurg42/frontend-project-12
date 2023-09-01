import { useContext } from 'react';
import ChatContext from '../contexts/chatContext.js';

const useChat = () => useContext(ChatContext);

export default useChat;
