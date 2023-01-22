import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../contexts/index.js';
import loginSchema from '../schemas/loginSchema.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const [isSuccessAuth, setSuccessAuth] = useState(true);
  const { user, login } = useAuthContext();
  const { token } = user;
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await login(values);
    } catch (e) {
      if (e.response.status === 401) {
        setSuccessAuth(false);
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
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token, isSuccessAuth]);

  return (
    <Row className="justify-content-center mt-3">
      <Col className="col-4">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <h2>Войти в чат</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>{t('form.username')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('form.usernamePlaceholder')}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && (errors.username || !isSuccessAuth)}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.username}`)}
              </Form.Control.Feedback>
            )}
            {!isSuccessAuth && (
              <Form.Control.Feedback type="invalid">
                {t('form.usernameNotExist')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.password && !!errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.password}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">{t('label.login')}</Button>
            <Link className="link-dark" to="/signup">{t('label.register')}</Link>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
