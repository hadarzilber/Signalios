import React from 'react';
import { Column, Row } from 'mui-flex-layout';
import { TextField, Card } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Formik, Field } from 'formik';
import styled from 'styled-components';

import Lists from './Lists';
import Suggested from './Suggested';

const FullForm = styled(Form)`
  width: 100%;
`;

const BorderlessSearchBar = styled(TextField)`
  &&& {
    fieldset {
      border: none;
    }
  }
`;

const SearchBar = styled(Row)`
  border-radius: 5px;
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

export default () => (
  <Row width={'100%'} height={'100%'}>
    <Scrollbars>
      <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <SearchBar width={'100%'} height={'10%'} alignItems={'center'} justifyContent={'center'}>
          <SearchCard elevation={3}>
            <Row alignItems={'center'}>
              <SearchIcon />
              <Formik>
                <FullForm>
                  <Field
                    fullWidth
                    variant={'outlined'}
                    type={'text'}
                    placeholder={'Search signals, bots...'}
                    name={`search`}
                    component={BorderlessSearchBar}
                  />
                </FullForm>
              </Formik>
            </Row>
          </SearchCard>
        </SearchBar>
        <Row width={'100%'}>
          <Suggested />
        </Row>
        <Row width={'80%'} height={'100%'}>
          <Lists />
        </Row>
      </Column>
    </Scrollbars>
  </Row>
);
