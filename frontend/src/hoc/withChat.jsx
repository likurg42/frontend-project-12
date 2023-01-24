import { Navigate } from 'react-router-dom';
import useAuthContext from '../contexts/authContext.js';

const withChat = (Component) => function ReturnedComponent() {
  const { user } = useAuthContext();
  const { token } = user;

  if (!token) {
    return <Navigate to="/login" replace="true" />;
  }

  return <Component />;
};

export default withChat;
