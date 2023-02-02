import * as yup from 'yup';

const getChannelSchema = () => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'channelNameMin3')
    .max(20, 'channelNameMax20')
    .required('channelNameRequired'),
});

export default getChannelSchema;
