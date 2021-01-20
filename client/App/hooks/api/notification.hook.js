import { generateApi } from '../../utilities/axios/generate-api';
import { notificationClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = notificationClient;
  const { get, put } = generateApi({ instance });

  const getAllNotifications = async () => get({ url: '/' });
  const viewNotifications = async () => put({ url: '/' });

  return { getAllNotifications, viewNotifications };
};
