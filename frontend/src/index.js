import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './contexts/authContext';
import { ChatProvider } from './contexts/chatContext';
import store from './slices';
import App from './App.jsx';
import socket from './socket/socket';

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
