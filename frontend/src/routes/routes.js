const API_PATH = '/api/v1';

const routes = {
  api: {
    login: [API_PATH, 'login'].join('/'),
    data: [API_PATH, 'data'].join('/'),
  },
};

export default routes;
