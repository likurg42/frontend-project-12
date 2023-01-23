import * as yup from 'yup';

const signupSchema = yup.object({
  username: yup.string().min(3, 'usernameMin3').max(20, 'usernameMax20').required('usernameRequired'),
  password: yup.string().min(6, 'passwordMin6').required('passwordRequired'),
  passwordConfirmation: yup.string().required('passwordConfirmationRequired')
    .oneOf([yup.ref('password')], 'passwordsMustMatch'),
});

export default signupSchema;
