import { generateApi } from '../../utilities/axios/generate-api';
import { signalClient } from '../../utilities/axios/clients';

export default () => {
  const { instance } = signalClient;
  const { get, post, put, deleteMethod } = generateApi({ instance });

  const getAllSignals = async () => get({ url: '/' });
  const getArchivedSignals = async () => get({ url: '/archived' });
  const getRemovedSignals = async () => get({ url: '/removed' });
  const getAllFavorites = async () => get({ url: `/favorites` });
  const createSignal = async ({ name, template }) => post({ url: '/', body: { name, template } });
  const share = async ({ id, collaborators }) => post({ url: `/${id}/share`, body: { collaborators } });
  const getSignal = async ({ id }) => get({ url: `/${id}` });
  const updateSignal = async ({ id, body }) => put({ url: `/${id}`, body });
  const favoriteSignal = async ({ id }) => put({ url: `/${id}/favorite` });
  const archiveSignal = async ({ id }) => put({ url: `/${id}/archive` });
  const unArchiveSignal = async ({ id }) => put({ url: `/${id}/unarchive` });
  const removeSignal = async ({ id }) => put({ url: `/${id}/remove` });
  const restoreSignal = async ({ id }) => put({ url: `/${id}/restore` });
  const deleteSignalForever = async ({ id }) => deleteMethod({ url: `/${id}` });
  const deleteAllForever = async () => deleteMethod({ url: `/` });

  return {
    getAllSignals,
    getAllFavorites,
    getArchivedSignals,
    getRemovedSignals,
    createSignal,
    getSignal,
    updateSignal,
    removeSignal,
    restoreSignal,
    deleteSignalForever,
    deleteAllForever,
    share,
    archiveSignal,
    favoriteSignal,
    unArchiveSignal
  };
};
