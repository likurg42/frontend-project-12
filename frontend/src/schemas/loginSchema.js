import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(4, 'usernameMin4').required('usernameRequired'),
  password: yup.string().min(4, 'passwordMin4').required('passwordRequired'),
});
export default loginSchema;
