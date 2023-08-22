import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className='text-center mt-5 mb-5'>{t('label.login')}</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
