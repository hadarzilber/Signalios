import { generateApi } from '../../utilities/axios/generate-api';
import { userClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = userClient;
  const { get, post } = generateApi({ instance });

  const getMyself = async () => get({ url: '/me' });
  const getUserByEmail = async ({ email }) => get({ url: `/email/${email}` });
  const getUser = async ({ username }) => get({ url: `/${username}` });

  return { getMyself, getUserByEmail, getUser };
};
