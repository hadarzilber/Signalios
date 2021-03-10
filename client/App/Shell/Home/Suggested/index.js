import React, { useState, useEffect } from 'react';
import { Column, Row } from 'mui-flex-layout';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useSignalApi from '../../../hooks/api/signal.hook';
import { useAlert } from '../../../Providers/AlertProvider';

const Bold = styled(Typography)`
  font-weight: 600;
  margin-top: 15px;
`;

export default () => {
  const [suggestedSignals, setSuggestedSignals] = useState([]);
  const { open } = useAlert();
  const { suggested } = useSignalApi();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await suggested();

        setSuggestedSignals(result);
      } catch (error) {
        open({ message: error });
      }
    };

    fetch();
  }, []);

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      {/* <Row flexWrap={'wrap'} width={'100%'} height={'100%'} justifyContent={'center'}>
        {suggestedSignals.map(signal => (
          <Signal key={template._id} signal={signal} />
        ))}
      </Row> */}
    </Column>
  );
};
