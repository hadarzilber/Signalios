import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { Paper, Typography } from '@material-ui/core';
import { AirplanemodeActive, BeachAccess, Fireplace } from '@material-ui/icons';

import { useShell } from '../../../../ShellProvider';

const Template = styled(Paper)`
  border: 1px solid #dadce0 !important;
  border-radius: 8px !important;
  height: 100%;
  width: 100%;
`;

const IconWrapper = styled(Column)`
  background-color: #f7f7f7;
  border-top-left-radius: 8px;
`;

const TemplateWrapper = styled(Row)`
  margin: 25px;
  width: 250px;
  height: 100px;
  cursor: pointer;
`;

const icons = {
  vacation: BeachAccess,
  travel: AirplanemodeActive,
  camping: Fireplace
};

export default ({ template: { _id: id, name, type, items, tasks } }) => {
  const { openCreateListDialog } = useShell();

  return (
    <TemplateWrapper>
      <Template variant={'outlined'} elevation={0} onClick={() => openCreateListDialog({ id })}>
        <Row width={'100%'} height={'100%'}>
          <IconWrapper
            width={'30%'}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {React.createElement(icons[type], { color: 'primary' })}
          </IconWrapper>
          <Column width={'70%'} justifyContent={'center'} m={2}>
            <Typography variant={'h6'}>{name}</Typography>
            <Typography variant={'caption'} color={'textSecondary'}>
              {`${items.length} items, ${tasks.length} tasks`}
            </Typography>
          </Column>
        </Row>
      </Template>
    </TemplateWrapper>
  );
};
