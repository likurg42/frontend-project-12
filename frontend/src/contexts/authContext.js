import React, {
  useContext, useState, useMemo, useCallback, useEffect,
} from 'react';
import axios from 'axios';
import routes from '../routes';

const getTokenFromLocalStorage = () => localStorage.getItem('userToken');
const setTokeInLocalStorage = (token) => localStorage.setItem('userToken', token);

export const AuthContext = React.createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getTokenFromLocalStorage);
  }, []);

  const login = useCallback(async (values) => {
    try {
      const res = await axios.post(routes.api.login, values);
      const { token: loginToken } = res.data;
      setToken(loginToken);
      setTokeInLocalStorage(loginToken);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const providerValue = useMemo(() => ({ token, login }), [token, login]);
  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default useAuthContext;
