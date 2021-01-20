import React from 'react';
import { Column, Row } from 'mui-flex-layout';
import Lists from './Signals';

export default () => (
  <Row width={'100%'} height={'100%'}>
    <Column height={'100%'} width={'100%'}>
      <Row height={'90%'} width={'100%'}>
        <Lists />
      </Row>
    </Column>
  </Row>
);
