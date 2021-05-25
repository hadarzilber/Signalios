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

export default ({ filter, channels }) => {
  const { signals } = useSignal();
  const [opened, setOpened] = useState(false);
  const [openedSignal, setOpenedSignal] = useState(null);
  const [filteredSignals, setFilteredSignals] = useState([]);
  const openList = ({ signal }) => {
    setOpened(true);
    setOpenedSignal(signal);
  };

  const closeList = () => {
    setOpened(false);
    setOpenedSignal(null);
  };

  useEffect(() => {
    const filteredSignals =
      filter.length !== 0
        ? signals.filter(x => x.pairName.toLowerCase().startsWith(filter.toLowerCase()))
        : signals;
    const filteredWithChannels = filteredSignals.filter(signal =>
      channels.some(channel => signal.channelName === channel.name)
    );

    let filteredNew = [];

    filteredWithChannels
      .reverse()
      .forEach(x => (!filteredNew.some(y => y.pairName === x.pairName) ? filteredNew.push(x) : ''));

    setFilteredSignals(filteredNew);
  }, [filter, channels]);

  useEffect(() => {
    setFilteredSignals(signals);
  }, [signals]);

  const [isUp, setIsUp] = useState(false);

  // setInterval(() => {
  //   setIsUp(Math.random() < 0.5);
  // }, 10000);

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
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
