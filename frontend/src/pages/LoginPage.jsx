import React from 'react';
import { LoginForm } from '../components/index.js';
import withAuth from '../hoc/withAuth.jsx';

const LoginPage = () => (
  <LoginForm />
);

export default withAuth(LoginPage, '/');
