import React from 'react';
import Moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, Chip, LinearProgress, IconButton } from '@material-ui/core';
import { Delete, Star } from '@material-ui/icons';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useSignal } from '../../../Providers/SignalProvider';
import { useChannel } from '../../../Providers/ChannelProvider';

const ListName = styled(Typography)`
  font-weight: bold;
`;
const ArrowDownIcon = styled(ArrowDownwardIcon)`
  color: ${props => (props.isUp ? 'grey' : 'red')};
`;

const ArrowUpIcon = styled(ArrowUpwardIcon)`
  color: ${props => (props.isUp ? 'green' : 'grey')};
`;

export default ({
  handleOpen,
  list: { _id: id, pairName, entryPrice, stopLoss, takeProfit, channelName, date }
}) => {
  const { handleFavorite, handleRemove } = useSignal();
  const { channels } = useChannel();
  const [isUp, setIsUp] = useState(false);

  setInterval(() => {
    setIsUp(Math.random() < 0.5);
  }, 10000);

  const Template = styled(Card)`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    cursor: pointer;
  `;

  const handleFavoriteClick = async () => {
    await handleFavorite({ id });
  };

  const handleRemoveClick = async () => {
    await handleRemove({ id });
  };

  const getChannelRate = channelName => channels.find(x => x.name == channelName).rate;

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template
          variant={'outlined'}
          onClick={() =>
            handleOpen({
              id,
              pairName,
              entryPrice,
              stopLoss,
              takeProfit,
              channelName,
              date
            })
          }
        >
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <ListName variant={'h5'}>{pairName}</ListName>
              <Typography variant={'caption'} color={'textSecondary'}>
                {/* <span> {Moment(date).calendar()} </span> */}
              </Typography>
              <Typography variant={'caption'} color={'textSecondary'}>
                <span> {entryPrice}$ </span>
              </Typography>

              <span> stop loss:{stopLoss.split(' ')[0]}$ </span>
              <span> take profit:{takeProfit}$ </span>
              <span> channel:{channelName} </span>
              <span> {getChannelRate(channelName)}% rate</span>
              <Row>
                <IconButton>
                  <Star onClick={handleFavoriteClick} />
                </IconButton>
                <IconButton>
                  <Delete onClick={handleRemoveClick} />
                </IconButton>
                {pairName === 'ETH/USDT' ? (
                  <>
                    <ArrowUpIcon isUp={isUp} />
                    <ArrowDownIcon isUp={isUp} />
                  </>
                ) : (
                  ''
                )}
              </Row>
            </Column>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
