import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import routes from '../routes/routes';
import useAuthContext from '../contexts';
import loginSchema from '../schemas/loginSchema';

const LoginForm = () => {
  const [isSuccessAuth, setSuccessAuth] = useState(true);
  const { saveToken, token } = useAuthContext();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const res = await axios.post(routes.api.login, values);
      const { token: loginToken } = res.data;
      saveToken(loginToken);
    } catch (e) {
      setSuccessAuth(false);
    }
  };

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
  }, [navigate, token, isSuccessAuth]);

  return (
    <Row className="justify-content-center mt-3">
      <Col className="col-4">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <h2>Войти в чат</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.username && (errors.username || !isSuccessAuth)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
            {!isSuccessAuth && (
              <Form.Control.Feedback type="invalid">
                Такого пользователя не существует
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
            <Form.Control.Feedback type="invalid">Неправильные данные входа</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">Войти</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
