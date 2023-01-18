import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts';

const HomePage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);

  return <h1>Chat</h1>;
};

export default HomePage;
