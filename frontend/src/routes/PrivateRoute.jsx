import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const { token } = user;
  const location = useLocation();

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
