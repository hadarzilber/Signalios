import React, { useState, useEffect } from 'react';
import { Row, Column } from 'mui-flex-layout';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useSignal } from '../../../Providers/SignalProvider';
import ListDialog from '../../List';
import List from './List';

const Bold = styled(Typography)`
  font-weight: 600;
`;

export default ({ filter }) => {
  const { signals } = useSignal();
  const [opened, setOpened] = useState(false);
  const [openedId, setOpenedId] = useState(null);
  const [filteredSignals, setFilteredSignals] = useState([])

  useEffect(() => {
    filter.length !== 0 ? setFilteredSignals(signals.filter(x => x.name.toLowerCase().startsWith(filter.toLowerCase()))) : setFilteredSignals(signals)
  }, [filter])

  useEffect(() => {
    setFilteredSignals(signals)
  }, [signals])


  const closeList = () => {
    setOpened(false);
    setOpenedId(null);
  };

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      {signals.length ? (
        <Bold color={'textSecondary'} variant={'caption'}>
          {'My Signals'}
        </Bold>
      ) : null}
      <Row
        height={'100%'}
        width={'100%'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'flex-start'}
      >
        {filteredSignals.map(list => (
          <List key={list._id} list={list} />
        ))}
      </Row>
      {opened && <ListDialog handleClose={closeList} opened={opened} id={openedId} />}
    </Column>
  );
};
