import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { Column, Padded } from 'mui-flex-layout';
import styled from 'styled-components';

import Image from '../../../assets/404.svg';

const NotFound = styled.img`
  height: 33%;
  width: 33%;
`;

export default () => {
  const { push } = useHistory();

  const handleHome = () => push('/home');

  return (
    <Column justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'}>
      <NotFound src={Image} />
      <Padded p={2}>
        <Typography>{'The requested page was not found'}</Typography>
      </Padded>
      <Padded p={2}>
        <Button size={'large'} color={'primary'} variant={'contained'} onClick={handleHome}>
          {'Back to Home'}
        </Button>
      </Padded>
    </Column>
  );
};
