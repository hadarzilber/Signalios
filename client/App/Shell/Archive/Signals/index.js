import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Column, Row, Padded } from 'mui-flex-layout';

import useSignalApi from '../../../hooks/api/Signal.hook';
import { useAlert } from '../../../Providers/AlertProvider';
import NoResults from '../../components/NoResults';
import { useSignal } from '../../../Providers/SignalProvider';
import Signal from './Signal';

export default () => {
  const [Signals, setSignals] = useState([]);
  const { getArchivedSignals } = useSignalApi();
  const { open } = useAlert();
  const { handleRemove, handleUnarchive } = useSignal();

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const data = await getArchivedSignals();

        setSignals(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchSignals();
  }, []);

  const removeItem = ({ id }) => setSignals([...Signals.filter(x => x._id !== id)]);

  const removeSignal = async ({ id }) => {
    await handleRemove({ id });
    removeItem({ id });
  };

  const UnarchiveSignal = async ({ id }) => {
    await handleUnarchive({ id });
    removeItem({ id });
  };

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      {Signals.length ? (
        <>
          <Row flexWrap={'wrap'} width={'100%'} height={'100%'} justifyContent={'center'}>
            {Signals.map(Signal => (
              <Signal
                unarchive={UnarchiveSignal}
                remove={removeSignal}
                key={Signal._id}
                Signal={Signal}
              />
            ))}
          </Row>
        </>
      ) : (
        <NoResults context={'Favorites'} />
      )}
    </Column>
  );
};
