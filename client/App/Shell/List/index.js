import React, { useState, useEffect } from 'react';
import { Dialog, Typography, Paper, Avatar, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { Column, Row } from 'mui-flex-layout';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import useSignalApi from '../../hooks/api/signal.hook';
import { useAlert } from '../../Providers/AlertProvider';
import { useSignal } from '../../Providers/SignalProvider';
// import { useAuth } from '../../Providers/AuthProvider';

const DialogPaper = styled(Paper)`
  && {
    height: 65%;
    border-radius: 15px;
  }
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
  const [signal, setSignal] = useState();
  // const { user } = useAuth();
  const { getSignal } = useSignal();
  const { open } = useAlert();
  // TODO: update signal
  // const { handleUpdate, handleShare } = useSignal();

  const signalStateChanged = data => {
    setSignal(data);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getSignal({ id });

        setSignal(data);
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
            <Typography variant={'h4'}>{signal.name}</Typography>
          </Header>
        </Column>
      </Dialog>
    </>
  );
};
