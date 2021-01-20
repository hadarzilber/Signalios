import React, { memo } from 'react';
import { Row, Column } from 'mui-flex-layout';
import styled from 'styled-components';

import ListProvider from '../Providers/SignalProvider';
import SecondaryToolbar from './components/SecondaryToolbar';
import ShellProvider from './ShellProvider';
import Navbar from './components/Navbar';

const OverflowContent = styled(Column)`
  overflow: auto;
`;

const Shell = styled(Column)`
  background: linear-gradient(45deg, #525275d6, #d0d1ff);
`;

export default memo(({ children }) => (
  <ListProvider>
    <ShellProvider>
      <Column width={'100%'} height={'100%'}>
        <Shell width={'100%'} height={'30%'}>
          <Row width={'100%'} height={'20%'}>
            <Navbar />
          </Row>
          <Row width={'100%'} height={'80%'}>
            <SecondaryToolbar />
          </Row>
        </Shell>
        <OverflowContent width={'100%'} height={'100%'}>
          {children}
        </OverflowContent>
      </Column>
    </ShellProvider>
  </ListProvider>
));
