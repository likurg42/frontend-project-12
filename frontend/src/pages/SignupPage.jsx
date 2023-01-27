import React from 'react';
import { SignupForm } from '../components/index.js';
import withAuth from '../hoc/withAuth.jsx';

const SignupPage = () => <SignupForm />;

export default withAuth(SignupPage, '/');
