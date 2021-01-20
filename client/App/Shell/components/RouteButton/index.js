import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Column } from 'mui-flex-layout';
import styled from 'styled-components';

export default ({ label, icon: Icon, to, children, ...props }) => {
  const match = useRouteMatch({ path: to, exact: true });

  const Label = styled(Typography)`
    &&& {
      color: ${({
        theme: {
          palette: {
            primary: { main }
          }
        }
      }) => (match ? main : '#3c4043')};
      letter-spacing: 0.17px !important;
      font: 700 12px/20px Google Sans, Roboto, Arial, sans-serif !important;
    }
  `;

  const RouteIcon = styled(Icon)`
    &&& {
      color: ${({
        theme: {
          palette: {
            primary: { main }
          }
        }
      }) => (match ? main : '#5f6368')} !important;
      height: 24px !important;
      width: 24px !important;
      line-height: 24px !important;
      fill: currentColor !important;
    }
  `;

  return (
    <Button component={Link} to={to} {...props}>
      <Column alignItems={'center'}>
        <RouteIcon />
        <Label>{label}</Label>
      </Column>
    </Button>
  );
};
