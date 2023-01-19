import * as yup from 'yup';

const signupSchema = yup.object({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(6).required('Password is required'),
  passwordConfirmation: yup.string().required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default signupSchema;
