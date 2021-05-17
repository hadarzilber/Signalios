import React, { useState } from 'react';
import { Column, Row } from 'mui-flex-layout';
import { TextField, Card, Button, Modal } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import createError from 'http-errors';
import readXlsxFile from 'read-excel-file';
import styled from 'styled-components';
import Lists from './Lists';
import Suggested from './Suggested';
import ChannelsModal from './ChannelsModal'

const BorderlessSearchBar = styled(TextField)`
  &&& {
    fieldset {
      border: none;
    }
  }
`;

const SearchBar = styled(Row)`
  border-radius: 5px;
  position: fixed;
  margin-bottom: 550px;
`;

const SearchIcon = styled(Search)`
  &&& {
    margin-left: 10px;
    color: #5f6368;
  }
`;

const SearchCard = styled(Card)`
  border-radius: 15px;
  width: 40%;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const ModalContent = styled(Column)`
  width: 60%;
  height: 60%;
  background-color: white !important;
`;

export default () => {
  const [filter, setfilter] = useState('');
  const [open, setOpen] = useState(false)
  const [channelsToDisplay, setChannelsToDisplay] = useState([])  

  return (
    <Row width={'100%'} height={'100%'}>
      <Scrollbars>
        <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <SearchBar width={'100%'} height={'10%'} alignItems={'center'} justifyContent={'center'}>
            <SearchCard elevation={3}>
              <Row alignItems={'center'}>
                <SearchIcon />
                <BorderlessSearchBar
                  fullWidth
                  variant={'outlined'}
                  type={'text'}
                  placeholder={'Search signals...'}
                  name={`search`}
                  onChange={event => setfilter(event.target.value)}
                />
              </Row>
            </SearchCard>
          </SearchBar>
          <Row width={'100%'}>
            <Suggested />
          </Row>
          <Row width={'100%'}>
            <Button size={'large'} onClick={() => setOpen(!open)}>{'ערוצים'}</Button>
          </Row>
          <Row width={'80%'} height={'100%'}>
            <Lists filter={filter} />
          </Row>
        </Column>
      </Scrollbars>
      {/* <ChannelsModal open={open} setOpen={setOpen} setChannelsToDisplay={setChannelsToDisplay}>
      </ChannelsModal> */}
    </Row>
  );
};
