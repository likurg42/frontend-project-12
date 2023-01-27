import { Navigate } from 'react-router-dom';
import useAuthContext from '../contexts/authContext.js';

const withAuth = (Component, to) => function ReturnedComponent() {
  const { user } = useAuthContext();
  const { token } = user;

  switch (to) {
    case '/login':
      return token ? <Component /> : <Navigate to={to} replace="true" />;
    case '/':
      return token ? <Navigate to={to} /> : <Component />;
    default:
      return <Component />;
  }
};

export default withAuth;
