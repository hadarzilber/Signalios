import React from 'react';
import { Row, Column } from 'mui-flex-layout';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import FieldArray from './components/FieldArray';

export default () => (
  <Column height={'100%'} width={'100%'}>
    <Column height={'100%'} width={'100%'}>
      <Row height={'100%'} width={'100%'}>
        <Column width={'100%'} height={'100%'}>
          <Typography variant={'body2'} color={'textSecondary'}>
            {'Items'}
          </Typography>
          <FieldArray name={'items'} />
        </Column>
        <Column width={'100%'} height={'100%'}>
          <Typography variant={'body2'} color={'textSecondary'}>
            {'Tasks'}
          </Typography>
          <FieldArray name={'tasks'} />
        </Column>
      </Row>
    </Column>
  </Column>
);
