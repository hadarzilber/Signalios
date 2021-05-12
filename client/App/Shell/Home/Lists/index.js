import React, { useState, useEffect } from 'react';
import { Row, Column } from 'mui-flex-layout';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import readXlsxFile from 'read-excel-file';
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
  const [filteredSignals, setFilteredSignals] = useState([]);

  useEffect(() => {
    filter.length !== 0
      ? setFilteredSignals(
          signals.filter(x => x.pairName.toLowerCase().startsWith(filter.toLowerCase()))
        )
      : setFilteredSignals(signals);
  }, [filter]);

  useEffect(() => {
    setFilteredSignals(signals);
  }, [signals]);

  const closeList = () => {
    setOpened(false);
    setOpenedId(null);
  };

  const [isUp, setIsUp] = useState(false);

  setInterval(() => {
    setIsUp(Math.random() < 0.5);
  }, 10000);

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      {signals.length ? (
        <div>
          <Bold color={'textSecondary'} variant={'caption'}>
            {'My Signals'}
          </Bold>
        </div>
      ) : null}
      <Row
        height={'100%'}
        width={'100%'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'flex-start'}
      >
        {filteredSignals.reverse().map(list => (
          <List key={list._id} list={list} isUp={isUp} />
        ))}
      </Row>
      {opened && <ListDialog handleClose={closeList} opened={opened} id={openedId} />}
    </Column>
  );
};
