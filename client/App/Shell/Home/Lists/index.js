import React, { useState } from 'react';
import { Row, Column } from 'mui-flex-layout';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { useSignal } from '../../../Providers/SignalProvider';
import ListDialog from '../../List';
import List from './List';

const Bold = styled(Typography)`
  font-weight: 600;
`;

export default () => {
  const { signals } = useSignal();
  const [opened, setOpened] = useState(false);
  const [openedId, setOpenedId] = useState(null);

  const openList = ({ id }) => {
    setOpened(true);
    setOpenedId(id);
  };

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
        {signals.map(list => (
          <List key={list._id} list={list} />
        ))}
      </Row>
      {opened && <ListDialog handleClose={closeList} opened={opened} id={openedId} />}
    </Column>
  );
};
