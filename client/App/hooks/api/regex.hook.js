import { generateApi } from '../../utilities/axios/generate-api';
import { regexClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = regexClient;
  const { get, post, put, deleteMethod } = generateApi({ instance });

  const addNewRegex = async (regex) => post({ url: '/', body: regex });

  return {
    addNewRegex
  };
};
