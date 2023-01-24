import React from 'react';
import { LoginForm } from '../components/index.js';
import withLogin from '../hoc/withLogin.jsx';

const LoginPage = () => (
  <LoginForm />
);

export default withLogin(LoginPage);
