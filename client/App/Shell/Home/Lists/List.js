import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, Chip, LinearProgress, IconButton, Avatar } from '@material-ui/core';
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
  margin-top: 10px;
`;

const ArrowUpIcon = styled(ArrowUpwardIcon)`
  color: ${props => (props.isUp ? 'green' : 'grey')};
  margin-top: 10px;
`;

const Template = styled(Card)`
  width: 100%;
  height: 210px;
  border-radius: 8px;
  cursor: pointer;
`;

const ChannelRate = styled(Avatar)`
  background-color: #4caf50;
  height: 23px;
  width: 23px;
  font-size: xx-small;
  margin-left: 5px;
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
                <span> {moment(date).format('DD-MM-YY hh:mm:ss')} </span>
              </Typography>
              <Row>
                <Typography variant={'caption'} color={'textSecondary'}>
                  {`by ${channelName}`}
                </Typography>
                <ChannelRate>{`${getChannelRate(channelName)}%`}</ChannelRate>
              </Row>
              <Typography variant={'h6'} color={'textPrimary'}>
                <span> {entryPrice}$ </span>
              </Typography>
              <Typography variant={'caption'} color={'textPrimary'}>
                <span> stop loss: {stopLoss.split(' ')[0]}$ </span>
              </Typography>

              <Typography variant={'caption'} color={'textPrimary'}>
                <span> take profit: {takeProfit}$ </span>
              </Typography>
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
