import React, {
  useState, useMemo, useCallback,
} from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';

const getUserFromLocalStorage = () => {
  const token = localStorage.getItem('userToken');
  const username = localStorage.getItem('username');
  return { token, username };
};

const updateUserInLocalStorage = (user) => {
  const { token, username } = user;
  if (token && username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
};

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const getHeaders = useCallback(() => {
    const { token } = user;
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  }, [user]);

  const saveUser = useCallback((loginToken, loginUsername) => {
    const newUser = { token: loginToken, username: loginUsername };
    setUser(newUser);
    updateUserInLocalStorage(newUser);
  }, []);

  const login = useCallback(async (values) => {
    const res = await axios.post(routes.api.login(), values);
    const { token: loginToken, username: loginUsername } = res.data;
    saveUser(loginToken, loginUsername);
  }, [saveUser]);

  const signup = useCallback(async (values) => {
    const { username, password } = values;
    const res = await axios.post(routes.api.signup(), { username, password });
    const { token: loginToken, username: loginUsername } = res.data;
    saveUser(loginToken, loginUsername);
  }, [saveUser]);

  const logout = () => {
    const emptyUser = { username: null, token: null };
    setUser(emptyUser);
    updateUserInLocalStorage(emptyUser);
  };

  const providerValue = useMemo(
    () => ({
      user, saveUser, getHeaders, logout, login, signup,
    }),
    [user, saveUser, getHeaders, login, signup],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
