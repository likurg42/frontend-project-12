import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes/routes.js';
import toastsParams from '../toasts/toastsParams.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBlocked, setBlocked] = useState(false);
  const [authFailure, setAuthFailure] = useState(null);
  const input = useRef(null);

  const notifyError = (text) => toast.error(text, toastsParams.getDefaultParams());

  const onSubmit = async (values) => {
    setBlocked(true);
    try {
      const res = await axios.post(routes.api.login(), values);
      login(res.data);
      navigate('/');
    } catch (e) {
      if (e.isAxiosError && e.response?.status === 401) {
        setAuthFailure(t('form.usernameNotExist'));
      } else {
        notifyError(t('error.connection'));
      }
    } finally {
      input.current.select();
      setBlocked(false);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
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
            <Form.Label>{t('form.login')}</Form.Label>
            <Form.Control
              type="text"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && (errors.username || !!authFailure)}
              ref={input}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.username}`)}
              </Form.Control.Feedback>
            )}
            {!!authFailure && (
              <Form.Control.Feedback type="invalid">
                {authFailure}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={values.password}
              onChange={handleChange}
              required
              isInvalid={touched.password && errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.password}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex align-items-center justify-content-between">
            <Form.Group className="d-flex justify-content-between align-items-center">
              <Button
                variant="primary"
                type="submit"
                disabled={isBlocked}
              >
                {t('label.login')}
              </Button>
            </Form.Group>
            <Link className="link-dark" to="/signup">{t('label.register')}</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
