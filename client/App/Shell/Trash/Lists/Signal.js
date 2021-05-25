import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, IconButton, Tooltip } from '@material-ui/core';
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';

const SignalName = styled(Typography)`
  font-weight: bold;
`;

const Template = styled(Card)`
  width: 100%;
  height: 220px;
  border-radius: 8px;
`;

export default ({ signal, deleteForever, restore }) => {
  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'}>
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <SignalName variant={'h5'}>{signal.pairName}</SignalName>
              <Typography variant={'caption'} color={'textSecondary'}>
                <span> {signal.entryPrice}$ </span>
              </Typography>
              <Typography variant={'caption'} color={'textSecondary'}>
                <span>{moment(signal.date).format('DD-MM-YY hh:mm:ss')}</span>
              </Typography>
              <span> stop loss: {signal.stopLoss.split(' ')[0]}$ </span>
              <span> take profit: {signal.takeProfit}$ </span>
            </Column>
            <Row
              alignItems={'center'}
              width={'100%'}
              height={'5%'}
              justifyContent={'space-between'}
            >
              <Row>
                <Tooltip title={'Restore'}>
                  <IconButton size={'small'} onClick={() => restore({ id: signal._id })}>
                    <RestoreFromTrashOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Delete Forever'}>
                  <IconButton size={'small'} onClick={() => deleteForever({ id: signal._id })}>
                    <DeleteForeverOutlined />
                  </IconButton>
                </Tooltip>
              </Row>
            </Row>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
