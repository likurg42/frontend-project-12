import React from 'react';
import { useTranslation } from 'react-i18next';
import { SignupForm } from '../components';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className='text-center mt-5 mb-5'>{t('label.register')}</h1>
      <SignupForm />
    </>
  );
};

export default SignupPage;
