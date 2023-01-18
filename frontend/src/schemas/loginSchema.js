import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(4).required(),
  password: yup.string().min(4).required(),
});
export default loginSchema;
