import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, IconButton } from '@material-ui/core';
import { Star,Delete } from '@material-ui/icons'


const SignalName = styled(Typography)`
  font-weight: bold;
`;

const Template = styled(Card)`
width: 100%;
height: 180px;
border-radius: 8px;
`;

export default ({ signal, handleFavoriteClick,handleRemoveItem }) => {

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'}>
          <Column p={2} height={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <SignalName variant={'h5'}>{signal.name}</SignalName>
            </Column>
            <Column>
              <Typography>{`Entry price: ${signal.entryPrice}`}</Typography>
              <Typography>{`Take profit: ${signal.takeProfit}`}</Typography>
              <Typography>{`Stop loss: ${signal.stopLoss}`}</Typography>
            </Column>
            <Row>
              <IconButton>
                <Star onClick={() => handleFavoriteClick(signal._id)} />
              </IconButton>
              <IconButton>
                <Delete onClick={() => handleRemoveItem(signal._id)} />
              </IconButton>
            </Row>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
