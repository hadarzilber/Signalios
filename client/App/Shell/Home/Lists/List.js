import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Typography, Card, Chip, LinearProgress } from '@material-ui/core';
import Moment from 'react-moment';

const ListName = styled(Typography)`
  font-weight: bold;
`;

const BiggerLinearProgress = styled(LinearProgress)`
  height: 8px;
`;

export default ({ handleOpen, list: { _id: id, name, progress, type, lastEdited } }) => {
  const Template = styled(Card)`
    width: 100%;
    height: 180px;
    border-radius: 8px;
    cursor: pointer;
  `;

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'} onClick={() => handleOpen({ id })}>
          {progress > -1 && <BiggerLinearProgress value={progress} variant={'determinate'} />}
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <ListName variant={'h5'}>{name}</ListName>
              <Typography variant={'caption'} color={'textSecondary'}>
                {'Last edited '}
                <Moment fromNow date={lastEdited} />
              </Typography>
            </Column>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
