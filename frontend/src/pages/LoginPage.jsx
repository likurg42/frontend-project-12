import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts.js';
import { LoginForm } from '../components/index.jsx';

const LoginPage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return (
      <LoginForm />
    );
  }

  return <div />;
};

export default LoginPage;
