import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, Chip, LinearProgress, IconButton } from '@material-ui/core';
import Moment from 'react-moment';
import { Delete, Star } from '@material-ui/icons';
import { useSignal } from '../../../Providers/SignalProvider';

const ListName = styled(Typography)`
  font-weight: bold;
`;

const BiggerLinearProgress = styled(LinearProgress)`
  height: 8px;
`;

export default ({
  handleOpen,
  list: {
    _id: id,
    pairName,
    progress,
    type,
    lastEdited,
    entryPrice,
    stopLoss,
    takeProfit,
    channelName
  }
}) => {
  const { handleFavorite, handleRemove } = useSignal();

  const Template = styled(Card)`
    width: 100%;
    height: 180px;
    border-radius: 8px;
    cursor: pointer;
  `;

  const handleFavoriteClick = async () => {
    await handleFavorite({ id });
  };

  const handleRemoveClick = async () => {
    await handleRemove({ id });
  };

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'} onClick={() => {}}>
          {progress > -1 && <BiggerLinearProgress value={progress} variant={'determinate'} />}
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <ListName variant={'h5'}>{pairName}</ListName>
              <Typography variant={'caption'} color={'textSecondary'}>
                <span> {entryPrice}$ </span>
              </Typography>

              <span> stop loss:{stopLoss.split(' ')[0]}$ </span>
              <span> take profit:{takeProfit}$ </span>
              <span> channel:{channelName} </span>
              <Row>
                <IconButton>
                  <Star onClick={handleFavoriteClick} />
                </IconButton>
                <IconButton>
                  <Delete onClick={handleRemoveClick} />
                </IconButton>
              </Row>
            </Column>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
