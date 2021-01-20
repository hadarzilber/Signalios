import React, { useState, useEffect } from 'react';
import { Dialog, Typography, Paper, Avatar, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { Column, Row } from 'mui-flex-layout';
import Moment from 'react-moment';
import styled from 'styled-components';
// import { Scrollbars } from 'react-custom-scrollbars';

import useSignalApi from '../../hooks/api/signal.hook';
import { useAlert } from '../../Providers/AlertProvider';
import { useSignal } from '../../Providers/SignalProvider';
import { useAuth } from '../../Providers/AuthProvider';
import UserAvatar from '../../components/UserAvatar';
// import ListActions from './components/ListActions';
// import DataForm from './components/DataForm';
// import CollaboratorsDialog from './components/CollaboratorsDialog';
// import ExportTemplateDialog from './components/ExportTemplateDialog';

const DialogPaper = styled(Paper)`
  && {
    height: 65%;
    border-radius: 15px;
  }
`;

const Overflow = styled(Row)`
  overflow: auto;
`;

const Header = styled(Row)`
  background-color: ${({
    theme: {
      palette: {
        secondary: { main }
      }
    }
  }) => main};
`;

export default ({ opened, id, handleClose }) => {
  const [list, setList] = useState({ collaborators: [] });
  const [openCollab, setOpenCollab] = useState(false);
  const { user } = useAuth();
  const { getSignal } = useSignal();
  const { open } = useAlert();
  const { handleUpdate, handleShare } = useSignal();

  const listStateChanged = data => {
    setList(data);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getSignal({ id });

        setList(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchList();
  }, []);

  return (
    <>
      <Dialog
        PaperComponent={DialogPaper}
        open={opened}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
        keepMounted
      >
        <Column height={'100%'} width={'100%'}>
          <Header
            width={'100%'}
            p={1}
            height={'10%'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'h4'}>{list.name}</Typography>
            <AvatarGroup>
              {list.collaborators.map(
                x =>
                  user._id !== x._id && (
                    <Tooltip key={x._id} title={x.email}>
                      <Avatar key={x._id}>{`${x.name.first[0]}${x.name.last[0]}`}</Avatar>
                    </Tooltip>
                  )
              )}
            </AvatarGroup>
          </Header>
          {/* <Overflow
            height={'75%'}
            width={'95%'}
            justifyContent={'center'}
            alignItems={'center'}
            m={2}
          >
            <Scrollbars>
              {list.items && list.tasks && <DataForm list={list} handleSubmit={handleSubmit} />}
            </Scrollbars>
          </Overflow> */}
          {/* <Row width={'100%'} height={'5%'} justifyContent={'flex-end'} alignItems={'flex-end'}>
            <ListActions
              openCollab={openCollabDialog}
              openExport={openExportDialog}
              updateList={listStateChanged}
              list={list}
              onClose={handleClose}
            />
          </Row> */}
        </Column>
      </Dialog>
      {/* {openExport && (
        <ExportTemplateDialog list={list} opened={openExport} handleClose={closeExportDialog} />
      )} */}
    </>
  );
};
