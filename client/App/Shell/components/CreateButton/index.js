import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { useShell } from '../../ShellProvider';

export default () => {
  const { openCreateListDialog } = useShell();

  return (
    <>
      <Tooltip title={'Add List'}>
        <Fab color={'secondary'} onClick={openCreateListDialog}>
          <Add />
        </Fab>
      </Tooltip>
    </>
  );
};
