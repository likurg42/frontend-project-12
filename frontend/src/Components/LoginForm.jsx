import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import useAuthContext from '../contexts';
import loginSchema from '../schemas/loginSchema';

const LoginForm = () => {
  const { login, token } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    login(values);
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
  }, [navigate, token]);

  return (
    <Row className="justify-content-center mt-3">
      <Col className="col-4">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.username && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">Войти</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
