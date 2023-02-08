import * as yup from 'yup';

const getChannelSchema = (channelsNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'channelNameMin3')
    .max(20, 'channelNameMax20')
    .notOneOf(channelsNames, 'channelNameAlreadyExist')
    .required('channelNameRequired'),
});

export default getChannelSchema;
