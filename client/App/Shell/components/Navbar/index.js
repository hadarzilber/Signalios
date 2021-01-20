import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Typography, Button, Paper } from '@material-ui/core';
import { Row } from 'mui-flex-layout';
import styled from 'styled-components';

import UserActions from './UserActions';

const Logo = styled.img`
  margin-right: 15px;
`;

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 25px;
  color: white;
  letter-spacing: 0.05rem;
`;

const ClickableHeader = styled(Row)`
  cursor: pointer;
`;

const Navbar = styled(Paper)`
  height: 100%;
  width: 100%;
  background: transparent;
`;

export default () => {
  const { push } = useHistory();

  const gotoHome = () => push('/home');

  const RouteButton = styled(Button)`
    border-bottom: ${({ active }) => (active ? '3px' : '0px')} solid #1648ff;
  `;

  const handleArchive = () => {
    push('/archive');
  };

  const handleTrash = () => {
    push('/trash');
  };

  return (
    <Navbar elevation={3}>
      <Row width={'100%'} height={'100%'} alignItems={'center'}>
        <ClickableHeader
          width={'10%'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={gotoHome}
        >
          <Title onClick={gotoHome} variant={'h6'}>
            {'Signalios'}
          </Title>
        </ClickableHeader>
        <Row width={'15%'}>
          <RouteButton
            active={useRouteMatch({ path: '/archive' })}
            color={'secondary'}
            onClick={handleArchive}
          >
            {'Favorites'}
          </RouteButton>
          <RouteButton
            active={useRouteMatch({ path: '/trash' })}
            color={'secondary'}
            onClick={handleTrash}
          >
            {'Trash'}
          </RouteButton>
        </Row>
        <Row width={'70%'} />
        <Row justifyContent={'center'} alignItems={'center'}>
          <UserActions />
        </Row>
      </Row>
    </Navbar>
  );
};
