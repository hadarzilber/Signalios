import { useLoading } from '../../Providers/LoadingProvider';

export const generateApi = ({ instance }) => {
  const { setLoading } = useLoading();

  const get = async ({ url }) => {
    setLoading(true);
    try {
      const { data } = await instance.get(url);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const post = async ({ url, body }) => {
    setLoading(true);
    try {
      const { data } = await instance.post(url, body);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const deleteMethod = async ({ url }) => {
    setLoading(true);
    try {
      const { data } = await instance.delete(url);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const put = async ({ url, body }) => {
    setLoading(true);
    try {
      const { data } = await instance.put(url, body);

      return data;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, put, deleteMethod };
};
