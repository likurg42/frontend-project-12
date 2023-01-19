import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './contexts/authContext.js';
import { ChatProvider } from './contexts/chatContext.js';
import store from './slices.js';
import App from './App.jsx';
import socket from './socket/socket.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider socket={socket}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>,
);
