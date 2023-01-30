import * as yup from 'yup';

const addChannelSchema = yup.object().shape({
  name: yup.string().min(3, 'channelNameMin3').max(20, 'channelNameMax20').required('channelNameRequired'),
});

export default addChannelSchema;
