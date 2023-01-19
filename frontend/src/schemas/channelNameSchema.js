import * as yup from 'yup';

const addChannelSchema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
});

export default addChannelSchema;
