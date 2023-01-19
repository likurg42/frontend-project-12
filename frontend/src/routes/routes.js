const API_PATH = '/api/v1';

const routes = {
  api: {
    login: [API_PATH, 'login'].join('/'),
    data: [API_PATH, 'data'].join('/'),
    signup: [API_PATH, 'signup'].join('/'),
  },
  socket: {
    newMessage: 'newMessage',
    newChannel: 'newChannel',
    removeChannel: 'removeChannel',
    renameChannel: 'renameChannel',
  },
  pages: {
    chat: '/',
    login: '/login',
    signup: '/signup',
  },

};

export default routes;
