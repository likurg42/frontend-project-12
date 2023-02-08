import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import getSignupSchema from '../schemas/signupSchema.js';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes/routes.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBlocked, setBlocked] = useState(false);
  const [isSuccessSignup, setSuccessSignup] = useState(true);
  const input = useRef(null);

  const onSubmit = async (values) => {
    setBlocked(true);
    try {
      const res = await axios.post(routes.api.signup(), values);
      login(res.data);
      navigate('/');
    } catch (e) {
      if (e.response.status === 409) {
        setSuccessSignup(false);
        input.current.select();
      }
    }
    setBlocked(false);
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
    validationSchema: getSignupSchema(),
    onSubmit,
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

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
              isInvalid={touched.username && (errors.username || !isSuccessSignup)}
              ref={input}
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
              isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.passwordConfirmation}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={isBlocked}
            >
              {t('label.register')}
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupForm;
