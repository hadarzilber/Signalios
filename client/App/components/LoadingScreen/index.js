import React from 'react';
import { Typography } from '@material-ui/core';
import { Column } from 'mui-flex-layout';

import Icon from '../../../assets/new/biglogo.png';

export default () => (
  <Column height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
    <img src={Icon} />
  </Column>
);
