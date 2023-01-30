import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import signupSchema from '../schemas/signupSchema.js';
import useAuth from '../hooks/useAuth.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const [isSuccessSignup, setSuccessSignup] = useState(true);
  const { user, signup } = useAuth();
  const { token } = user;
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signup(values);
    } catch (e) {
      if (e.response.status === 409) {
        setSuccessSignup(false);
      }
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <Row className="justify-content-center mt-3">
      <Col md={6}>
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>{t('form.username')}</Form.Label>
            <Form.Control
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && (errors.username || !isSuccessSignup)}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.username}`)}
              </Form.Control.Feedback>
            )}
            {!isSuccessSignup && (
              <Form.Control.Feedback type="invalid">
                {t('form.usernameAlreadyExist')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>{t('form.password')}</Form.Label>
            <Form.Control
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && !!errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.password}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordConfirmation">
            <Form.Label>{t('form.passwordConfirmation')}</Form.Label>
            <Form.Control
              type="password"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.passwordConfirmation}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">{t('label.register')}</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupForm;
