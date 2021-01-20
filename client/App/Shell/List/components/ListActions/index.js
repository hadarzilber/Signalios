import React from 'react';
import { Row } from 'mui-flex-layout';
import {
  UnarchiveOutlined,
  GroupAddOutlined,
  TransformOutlined,
  ArchiveOutlined,
  DeleteOutlined
} from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';

import { useList } from '../../../../Providers/ListProvider';

export default ({ list, onClose, openCollab, openExport, updateList }) => {
  const { handleUnarchive, handleArchive, handleRemove } = useList();

  const remove = async () => {
    const data = await handleRemove({ id: list._id });

    updateList(data);
    onClose();
  };

  const archive = async () => {
    const data = await handleArchive({ id: list._id });

    updateList(data);
    onClose();
  };

  const unarchive = async () => {
    const data = await handleUnarchive({ id: list._id });

    updateList(data);
    onClose();
  };

  return (
    <Row height={'10%'} width={'30%'} justifyContent={'center'} alignItems={'center'}>
      <Tooltip title={'Export as a template'}>
        <IconButton onClick={openExport}>
          <TransformOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Add collaborator'}>
        <IconButton onClick={openCollab}>
          <GroupAddOutlined />
        </IconButton>
      </Tooltip>
      {list.archived ? (
        <Tooltip title={'Unarchive'}>
          <IconButton onClick={unarchive}>
            <UnarchiveOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={'Archive'}>
          <IconButton onClick={archive}>
            <ArchiveOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={'Remove'}>
        <IconButton onClick={remove}>
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
    </Row>
  );
};
