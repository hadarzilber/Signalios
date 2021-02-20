import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, Chip, IconButton, Tooltip } from '@material-ui/core';

const SignalName = styled(Typography)`
  font-weight: bold;
`;

export default ({ signal, unarchive, remove }) => {
  const Template = styled(Card)`
    width: 100%;
    height: 180px;
    border-radius: 8px;
  `;

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'}>
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <SignalName variant={'h5'}>{signal.name}</SignalName>
            </Column>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
