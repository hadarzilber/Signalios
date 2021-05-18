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
  const [openedSignal, setOpenedSignal] = useState(null);
  const [filteredSignals, setFilteredSignals] = useState([]);
  const openList = ({ signal }) => {
    console.log(`OPENED ${signal ? signal.pairName : 'not yet!'}`);
    setOpened(true);
    setOpenedSignal(signal);
  };

  const closeList = () => {
    setOpened(false);
    setOpenedSignal(null);
  };

  useEffect(() => {
    filter.length !== 0
      ? setFilteredSignals(
          signals.filter(x => x.pairName.toLowerCase().startsWith(filter.toLowerCase())).reverse()
        )
      : setFilteredSignals(signals.reverse());
  }, [filter]);

  useEffect(() => {
    setFilteredSignals(signals);
  }, [signals]);

  const [isUp, setIsUp] = useState(false);

  // setInterval(() => {
  //   setIsUp(Math.random() < 0.5);
  // }, 10000);

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
        {filteredSignals.map(signal => (
          <List key={signal._id} list={signal} handleOpen={() => openList({ signal })} />
        ))}
      </Row>
      {opened && openedSignal && (
        <ListDialog
          handleClose={closeList}
          opened={opened}
          getHistoryParams={{
            pairName: openedSignal.pairName,
            channelName: openedSignal.channelName
          }}
        />
      )}
    </Column>
  );
};
