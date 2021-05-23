import React, { useState, useEffect } from 'react';
import { Typography, Dialog, Paper, Card, Divider } from '@material-ui/core';
import { Column, Row } from 'mui-flex-layout';
import styled from 'styled-components';
import { useAlert } from '../../Providers/AlertProvider';
import { useSignal } from '../../Providers/SignalProvider';
import { ContactSupportOutlined } from '@material-ui/icons';
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

const HistoryCard = styled(Card)`
  max-width: 500px;
  min-height: 80px;
  margin: 5px;
  padding: 5px;
`;

const CardsScrollableColumn = styled(Column)`
  overflow-y: scroll;
`;

const Roww = styled(Row)`
  justify-content: space-evenly;
`;

const SucceededTypography = styled(Typography)`
  color: green;
`;

const FailedTypography = styled(Typography)`
  color: red;
`;

export default ({ opened, getHistoryParams, handleClose }) => {
  const [pairNameHistory, setPairNameHistory] = useState([]);
  // const { user } = useAuth();
  const { handleGetPairNameHistory } = useSignal();
  const { open } = useAlert();

  useEffect(() => {
    const fetchPairNameHistory = async () => {
      try {
        const data = await handleGetPairNameHistory({
          pairName: getHistoryParams.pairName,
          channelName: getHistoryParams.channelName
        });

        setPairNameHistory(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchPairNameHistory();
  }, []);

  return (
    <>
      <Dialog
        PaperComponent={DialogPaper}
        open={opened}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
        keepMounted
        overflow={'hidden'}
      >
        <Column overflow={'hidden'}>
          <Header
            width={'100%'}
            p={1}
            height={'10%'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            {`${getHistoryParams.pairName} histroy in ${getHistoryParams.channelName}`}
          </Header>
          <CardsScrollableColumn height={'100%'} width={'100%'}>
            {pairNameHistory &&
              pairNameHistory.map(({ entryPrice, stopLoss, takeProfit, isSuccessful }) => (
                <HistoryCard justifyContent={'center'}>
                  <Roww>
                    <Column>
                      <Typography variant={'caption'} color={'textSecondary'}>
                        <span> {entryPrice}$ </span>
                      </Typography>
                      <span> stop loss:{stopLoss.split(' ')[0]}$ </span>
                      <span> take profit:{takeProfit}$ </span>
                    </Column>
                    <Divider orientation="vertical" flexItem />
                    {isSuccessful && (
                      <SucceededTypography variant={'subtitle1'}>Succeeded</SucceededTypography>
                    )}
                    {!isSuccessful && (
                      <FailedTypography variant={'subtitle1'}>Failed</FailedTypography>
                    )}
                  </Roww>
                </HistoryCard>
              ))}
          </CardsScrollableColumn>
        </Column>
      </Dialog>
    </>
  );
};
