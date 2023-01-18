import React, {
  useContext, useState, useMemo, useCallback, useEffect,
} from 'react';

const getTokenFromLocalStorage = () => localStorage.getItem('userToken');
const setTokenInLocalStorage = (token) => localStorage.setItem('userToken', token);

export const AuthContext = React.createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getTokenFromLocalStorage);
  }, []);

  const saveToken = useCallback((loginToken) => {
    setToken(loginToken);
    setTokenInLocalStorage(loginToken);
  }, []);

  const providerValue = useMemo(() => ({ token, saveToken }), [token, saveToken]);
  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default useAuthContext;
