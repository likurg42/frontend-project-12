import * as yup from 'yup';

const getMessagesSchema = () => yup.object({
  message: yup
    .string()
    .trim()
    .required(),
});

export default getMessagesSchema;
