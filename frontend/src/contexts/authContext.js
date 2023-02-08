import React, {
  useState, useMemo, useCallback,
} from 'react';

const generateEmptyUser = () => ({
  username: null,
  token: null,
});
const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user')) || generateEmptyUser();

const setUserInLocalStorage = (user) => localStorage.setItem('user', JSON.stringify(user));

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const getHeaders = useCallback(() => {
    const { token } = user;
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  }, [user]);

  const login = (data) => {
    setUser(data);
    setUserInLocalStorage(data);
  };

  const logout = () => {
    const emptyUser = generateEmptyUser();
    setUser(emptyUser);
    setUserInLocalStorage(emptyUser);
  };

  const providerValue = useMemo(
    () => ({
      user, getHeaders, logout, login,
    }),
    [user, getHeaders],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
