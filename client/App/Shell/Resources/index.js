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
import { useResource } from '../../Providers/ResourceProvider';

const Bold = styled(Typography)`
  font-weight: 600;
`;

export default () => {
  console.log('useresource() ->', useResource());
  console.log('useresource ->', useResource);
  console.log('useresource.resources ->', useResource.resources);
  // const { resources } = useResource();
  const resources = [];

  return (
    <Column height={'100%'} width={'90%'} alignItems={'center'} style={{ margin: 'auto' }}>
      {/* <div style={{ width: '80%', margin: 'auto', verticalAlign: 'top' }}> */}
      {resources.length ? (
        <Bold color={'textSecondary'} variant={'caption'}>
          {'Resources'}
        </Bold>
      ) : null}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Bold>{'Source'}</Bold>
              </TableCell>
              <TableCell>
                <Bold>{'Name'}</Bold>
              </TableCell>
              <TableCell>
                <Bold>{'Rate'}</Bold>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map(resource => (
              //   <List key={list._id} list={list} />
              <TableRow key={resource.name}>
                <TableCell component="th" scope="row">
                  {resource.source}
                </TableCell>
                <TableCell component="th" scope="row">
                  {resource.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {resource.rate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {opened && <ListDialog handleClose={closeList} opened={opened} id={openedId} />} */}
    </Column>
  );
};
