import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from './contexts/authContext.js';
import { ChatProvider } from './contexts/chatContext.js';
import store from './slices/index.js';
import App from './App.jsx';
import initSocket from './socket/socket.js';
import initI18n from './i18n/i18n.js';

const init = () => {
  const i18n = initI18n();
  const socket = initSocket();
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <ChatProvider socket={socket}>
          <ReduxProvider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ReduxProvider>
        </ChatProvider>
      </AuthProvider>
    </React.StrictMode>,
  );
};

export default init;
