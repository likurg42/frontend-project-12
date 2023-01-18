import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import loginSchema from '../schemas/loginSchema';

const LoginForm = () => {
  const onSubmit = () => {
    console.log('submit');
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
      login: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  console.log(errors);

  useEffect(() => {
    console.log(values.login, values.password);
  });

  return (
    <Row className="justify-content-center mt-3">
      <Col className="col-4">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.login && !!errors.login}
            />
            <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
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
