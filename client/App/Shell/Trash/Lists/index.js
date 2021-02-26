import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Column, Row } from 'mui-flex-layout';
import styled from 'styled-components';

import useSignalApi from '../../../hooks/api/Signal.hook';
import { useAlert } from '../../../Providers/AlertProvider';
import NoResults from '../../components/NoResults';
import Signal from './Signal';

const EmptyTrashButton = styled(Button)`
  margin-left: 15px;
`;

export default () => {
  const [Signals, setSignals] = useState([]);
  const { open } = useAlert();
  const {
    getRemovedSignals,
    deleteAllForever,
    restoreSignal,
    deleteSignalForever
  } = useSignalApi();

  const removeItem = ({ id }) => {
    setSignals([...Signals.filter(x => x._id !== id)]);
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllForever();
      setSignals([]);
      open({ message: 'Emptied Trash successfully' });
    } catch (error) {
      open({ message: error });
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      await deleteSignalForever({ id });
      removeItem({ id });
      open({ message: 'Deleted Signal permanently' });
    } catch (error) {
      open({ message: error });
    }
  };

  const handleRestore = async ({ id }) => {
    try {
      await restoreSignal({ id });

      removeItem({ id });
      open({ message: 'Successfully restored Signal' });
    } catch (error) {
      open({ message: error });
    }
  };

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const data = await getRemovedSignals();

        setSignals(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchSignals();
  }, []);

  return (
    <Column height={'100%'} width={'100%'}>
      <Row p={1} justifyContent={'center'} alignItems={'center'}>
        <Typography color={'textSecondary'} variant={'h6'}>
          {'Signals in Trash are deleted after 7 days'}
        </Typography>
        <EmptyTrashButton onClick={handleDeleteAll} color={'primary'}>
          {'Empty Trash'}
        </EmptyTrashButton>
      </Row>
      <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        {Signals.length ? (
          <Row flexWrap={'wrap'} width={'100%'} height={'100%'}>
            {Signals.map(signal => (
              <Signal
                restore={handleRestore}
                deleteForever={handleDelete}
                key={Signal._id}
                signal={signal}
              />
            ))}
          </Row>
        ) : (
          <NoResults context={'Trash'} />
        )}
      </Column>
    </Column>
  );
};
