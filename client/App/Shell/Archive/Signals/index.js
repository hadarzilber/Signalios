import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Column, Row, Padded } from 'mui-flex-layout';
import Signal from './Signal'
import { useAlert } from '../../../Providers/AlertProvider';
import NoResults from '../../components/NoResults';
import { useSignal } from '../../../Providers/SignalProvider';

export default () => {
  const [Signals, setSignals] = useState([]);
  const { open } = useAlert();
  const { handleRemove, handleUnarchive ,GetAllFavorites} = useSignal();

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const data = await GetAllFavorites();

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
      {Signals?.length ? (
        <>
          <Row flexWrap={'wrap'} width={'100%'} height={'100%'} justifyContent={'center'}>
            {Signals.map(x => (
              <Signal
                unarchive={UnarchiveSignal}
                remove={removeSignal}
                key={x._id}
                signal={x}
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
