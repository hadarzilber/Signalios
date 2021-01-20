import React from 'react';
import { Column } from 'mui-flex-layout';

export default ({ children }) => (
  <Column width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
    {children}
  </Column>
);
