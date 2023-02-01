import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().trim().required('usernameRequired'),
  password: yup.string().trim().min(4, 'passwordMin4').required('passwordRequired'),
});
export default loginSchema;
