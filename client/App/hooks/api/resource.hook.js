import { generateApi } from '../../utilities/axios/generate-api';
import { resourceClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = resourceClient;
  const { get } = generateApi({ instance });

  const getAllResources = async () => get({ url: '/' });

  return { getAllResources };
};
