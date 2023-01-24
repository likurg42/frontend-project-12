import { Navigate } from 'react-router-dom';
import useAuthContext from '../contexts/authContext.js';

const withLogin = (Component) => function ReturnedComponent() {
  const { user } = useAuthContext();
  const { token } = user;

  if (token) {
    return <Navigate to="/" replace="true" />;
  }

  return <Component />;
};

export default withLogin;
