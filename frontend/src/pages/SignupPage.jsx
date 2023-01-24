import React from 'react';
import { SignupForm } from '../components/index.js';
import withLogin from '../hoc/withLogin.jsx';

const SignupPage = () => <SignupForm />;

export default withLogin(SignupPage);
