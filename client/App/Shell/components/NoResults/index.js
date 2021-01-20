import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Image from '../../../../assets/logo2.png';

const NoResults = styled.img`
  height: 300px;
  width: 300px;
  margin-top: 25px;
`;

export default ({ context }) => (
  <>
    <Typography variant={'h4'} color={'textSecondary'}>
      {`Oops... your ${context} is empty`}
    </Typography>
    <NoResults src={Image} />
  </>
);
