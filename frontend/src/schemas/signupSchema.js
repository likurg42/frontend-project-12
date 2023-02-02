import * as yup from 'yup';

const getSignupSchema = () => yup.object({
  username: yup
    .string()
    .trim()
    .min(3, 'usernameMin3')
    .max(20, 'usernameMax20')
    .required('usernameRequired'),
  password: yup.string().trim().min(6, 'passwordMin6').required('passwordRequired'),
  passwordConfirmation: yup.string().trim().required('passwordConfirmationRequired')
    .oneOf([yup.ref('password')], 'passwordsMustMatch'),
});

export default getSignupSchema;
