import { generateApi } from '../../utilities/axios/generate-api';
import { channelClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = channelClient;
  const { get } = generateApi({ instance });

  const getAllChannels = async () => get({ url: '/' });

  return {
    getAllChannels
  };
};
