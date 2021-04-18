import React, { createContext, useState, useEffect, useContext } from 'react';

import useSignalApi from '../../hooks/api/signal.hook';
import { useAlert } from '../AlertProvider';

const SignalContext = createContext();

export default props => {
  const [signals, setSignals] = useState([]);
  const { open } = useAlert();
  const {
    getAllSignals,
    getAllFavorites,
    createSignal,
    archiveSignal,
    unArchiveSignal,
    removeSignal,
    favoriteSignal,
    share,
    updateSignal
  } = useSignalApi();

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const data = await getAllSignals();

        setSignals(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchSignals();
  }, []);

  const removePredicate = item => !item.archived && !item.removed;
  const GetAllFavorites = async () => {
    try {
      const data = await getAllFavorites();

      return data;
    } catch (error) {
      open({ message: error });
    }
  };

  const create = async ({ name, template }) => {
    try {
      const data = await createSignal({ name, template });

      setSignals([...signals, data]);
      open({ message: 'Signal created' });
    } catch (error) {
      open({ message: error });
    }
  };

  const handleUpdate = async ({ id, items, tasks }) => {
    try {
      const data = await updateSignal({ id, body: { items, tasks } });

      setSignals([...signals.map(x => (x._id === id ? data : x)).filter(removePredicate)]);

      return data;
    } catch (error) {
      open({ message: error });
    }
  };

  const handleArchive = async ({ id }) => {
    try {
      const data = await archiveSignal({ id });

      setSignals([...signals.filter(x => x._id !== id)]);
      open({ message: 'Signal archived' });

      return data;
    } catch (error) {
      open({ message: error });
    }
  };

  const handleFavorite = async ({ id }) => {
    try {
      const data = await favoriteSignal({ id });
      open({ message: 'Signal favorite' });
    } catch (error) {
      open({ message: error });
    }
  };

  const handleRemove = async ({ id }) => {
    try {
      await removeSignal({ id });

      setSignals([...signals.filter(x => x._id !== id)]);
      open({ message: 'Signal removed and moved to Trash' });
    } catch (error) {
      open({ message: error });
    }
  };

  const handleUnarchive = async ({ id }) => {
    try {
      const data = await unArchiveSignal({ id });

      setSignals([...signals, data]);
      open({ message: 'Signal unarchived' });

      return data;
    } catch (error) {
      open({ message: error });
    }
  };

  const handleShare = async ({ id, collaborators }) => {
    try {
      const data = await share({ id, collaborators });

      open({ message: `Shared successfully!` });

      return data;
    } catch (error) {
      open({ message: error });
    }
  };

  const { children } = props;

  return (
    <SignalContext.Provider
      value={{
        signals,
        GetAllFavorites,
        create,
        handleRemove,
        handleShare,
        handleArchive,
        handleUnarchive,
        handleFavorite,
        handleUpdate
      }}
      {...props}
    >
      {children}
    </SignalContext.Provider>
  );
};

export const useSignal = () => useContext(SignalContext);
