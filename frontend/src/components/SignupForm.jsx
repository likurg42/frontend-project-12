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
import routes from '../routes/routes.js';
import { useAuthContext } from '../contexts/index.js';
import signupSchema from '../schemas/signupSchema.js';

const SignupForm = () => {
  const [isSuccessSignup, setSuccessSignup] = useState(true);
  const { user, saveUser } = useAuthContext();
  const { token } = user;
  const navigate = useNavigate();

  const signup = async (values) => {
    const { username, password } = values;
    try {
      const res = await axios.post(routes.api.signup, { username, password });
      const { token: loginToken, username: loginUsername } = res.data;
      saveUser(loginToken, loginUsername);
    } catch (e) {
      setSuccessSignup(false);
    }
  };

  const onSubmit = (values) => {
    signup(values);
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
  }, [navigate, token, isSuccessSignup]);

  return (
    <Row className="justify-content-center mt-3">
      <Col className="col-4">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          <h2>Регистрация</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.username && (errors.username || !isSuccessSignup)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
            {!isSuccessSignup && (
              <Form.Control.Feedback type="invalid">
                Такой пользователь уже существует
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
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordConfirmation">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Повторите пароль пароль"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passwordConfirmation}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">Войти</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupForm;
