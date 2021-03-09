import React, { useState } from 'react';
import { Row, Column } from 'mui-flex-layout';
import styled from 'styled-components';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { useAuth } from '../../Providers/AuthProvider';

const Bold = styled(Typography)`
  font-weight: 600;
`;

export default () => {
  const { user } = useAuth();

  console.log('user', user);

  return (
    // <Column height={'100%'} width={'90%'} alignItems={'center'} style={{ margin: 'auto' }}>
    //   <Paper width={'100%'}>
    //     <h1>{'rick'}</h1>
    //   </Paper>
    // </Column>
    <Column height={'100%'} width={'80%'} alignItems={'center'} style={{ margin: 'auto' }}>
      {/* <div style={{ width: '80%', margin: 'auto', verticalAlign: 'top' }}> */}
      <Bold color={'textSecondary'} variant={'caption'}>
        {'Profile'}
      </Bold>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{'Name'}</TableCell>
              <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{'User Name'}</TableCell>
              <TableCell>{`${user.username}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{'Email'}</TableCell>
              <TableCell>{`${user.email}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* {opened && <ListDialog handleClose={closeList} opened={opened} id={openedId} />} */}
    </Column>
  );
  //   return <h1>{'hi'}</h1>;
};
