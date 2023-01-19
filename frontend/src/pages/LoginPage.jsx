import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { LoginForm } from '../components';

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
