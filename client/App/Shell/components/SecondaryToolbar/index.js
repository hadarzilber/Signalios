import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Button, Typography } from '@material-ui/core';
import { BorderStyle, Explore } from '@material-ui/icons';
import { useShell } from '../../ShellProvider';
import { useAuth } from '../../../Providers/AuthProvider';
import UserAvatar from '../../../components/UserAvatar';
import CreateListButton from '../CreateButton';

const CircledButton = styled(Button)`
  border-radius: 8px;
  margin-top: 15px;
`;

const Bold = styled(Typography)`
  font-weight: 700;
`;

const InsetRow = styled(Row)`
  position: absolute;
  bottom: -26px;
  right: 26px;
`;

const BoldText = styled(Bold)`
  color: white;
`;

const WhiteText = styled(Typography)`
  color: white;
`;

const ExploreIcon = styled(Explore)`
  font-size: 35px;
  color: white;
  margin-bottom: 10px;
`;

const TemplateIcon = styled(BorderStyle)`
  font-size: 35px;
  color: white;
  margin-bottom: 10px;
`;

const SecondaryToolbar = styled(Row)`
  position: relative;
`;

export default () => {
  const { user } = useAuth();
  const { openCreateTemplateDialog } = useShell();
  const { push } = useHistory();

  const handleExplore = () => {
    push('/explore');
  };

  return (
    <SecondaryToolbar width={'100%'} height={'100%'}>
      <Row width={'20%'} m={1} alignItems={'center'} justifyContent={'flex-start'}>
        <UserAvatar user={user} size={'lg'} />
        <Column m={2}>
          <WhiteText variant={'h6'}>{'Hello,'}</WhiteText>
          <BoldText variant={'h6'}>{`${user.name.first} ${user.name.last}`}</BoldText>
        </Column>
      </Row>
      <Row width={'35%'} />
      <Row width={'5%'} />
    </SecondaryToolbar>
  );
};
