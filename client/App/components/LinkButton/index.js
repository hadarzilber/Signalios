import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default ({ to, children, ...props }) => (
  <Button component={Link} to={to} {...props}>
    {children}
  </Button>
);
