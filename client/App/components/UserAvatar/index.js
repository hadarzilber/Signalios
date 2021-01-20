import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export default ({
  size = 'small',
  user: {
    name: { first, last }
  }
}) => {
  const sizesToMeasures = {
    xsm: '20px',
    sm: '32px',
    md: '50px',
    lg: '100px',
    xl: '150px'
  };

  const StyledAvatar = styled(Avatar)`
    height: ${sizesToMeasures[size]};
    width: ${sizesToMeasures[size]};
  `;

  return <StyledAvatar alt={`${first[0]} ${last[0]}`}>{`${first[0]} ${last[0]}`}</StyledAvatar>;
};
