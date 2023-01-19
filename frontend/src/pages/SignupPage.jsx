import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/index.js';
import { SignupForm } from '../components/index.js';

const SignupPage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return (
      <SignupForm />
    );
  }

  return <div />;
};

export default SignupPage;
