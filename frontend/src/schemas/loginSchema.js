import * as yup from 'yup';

const loginSchema = yup.object().shape({
  login: yup.string().min(6).required(),
  password: yup.string().min(8).required(),
});

export default loginSchema;
