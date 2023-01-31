import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const { token } = user;

  return (
    token ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
