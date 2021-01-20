import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'mui-flex-layout';
import { ButtonBase, Paper, Typography, Card, Chip, IconButton, Tooltip } from '@material-ui/core';
import {
  AirplanemodeActive,
  BeachAccess,
  Fireplace,
  RestoreFromTrashOutlined,
  DeleteForeverOutlined
} from '@material-ui/icons';

const SignalName = styled(Typography)`
  font-weight: bold;
`;

const icons = {
  vacation: <BeachAccess />,
  travel: <AirplanemodeActive />,
  camping: <Fireplace />
};

export default ({ Signal: { _id: id, name, type }, deleteForever, restore }) => {
  const Template = styled(Card)`
    width: 100%;
    height: 180px;
    border-radius: 8px;
  `;

  return (
    <Row width={'22%'} m={2}>
      <Column width={'100%'} height={'100%'}>
        <Template variant={'outlined'}>
          <Column p={2} height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Column justifyContent={'center'} alignItems={'center'}>
              <SignalName variant={'h5'}>{name}</SignalName>
            </Column>
            <Row
              alignItems={'center'}
              width={'100%'}
              height={'5%'}
              justifyContent={'space-between'}
            >
              <Row>
                <Chip icon={icons[type]} label={type} size={'small'} variant={'default'} />
              </Row>
              <Row>
                <Tooltip title={'Restore'}>
                  <IconButton size={'small'} onClick={() => restore({ id })}>
                    <RestoreFromTrashOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Delete Forever'}>
                  <IconButton size={'small'} onClick={() => deleteForever({ id })}>
                    <DeleteForeverOutlined />
                  </IconButton>
                </Tooltip>
              </Row>
            </Row>
          </Column>
        </Template>
      </Column>
    </Row>
  );
};
