import React from 'react';
import { Column, Row, Padded } from 'mui-flex-layout';
import { useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Form, Field } from 'formik';

const FullForm = styled(Form)`
  width: 45%;
`;

const SignUpText = styled(Typography)`
  cursor: pointer;
  margin-left: 5px;
  font-size: 15px;
`;

const SignUpDescriptionText = styled(Typography)`
  color: #3a3636;
  font-weight: 500;
  font-size: 15px;
`;

const Header = styled(Typography)`
  color: #3a3636;
  font-weight: bolder;
`;

export default () => {
  const { push } = useHistory();

  const gotoRegister = () => {
    push('/register');
  };

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Header variant={'h3'}>{'Log in'}</Header>
      <Row height={'5%'} />

      <FullForm>
        <Padded>
          <Field fullWidth type="email" label="Email" name="email" component={TextField} />
        </Padded>
        <Padded>
          <Field fullWidth type="password" label="Password" name="password" component={TextField} />
        </Padded>
        <Padded m={1}>
          <Button fullWidth color={'primary'} variant={'contained'} type={'submit'}>
            {'Log in'}
          </Button>
        </Padded>
        <Padded>
          <SignUpDescriptionText variant={'caption'}>
            {`Don't have an account?`}
          </SignUpDescriptionText>
          <SignUpText onClick={gotoRegister} variant={'caption'} color={'secondary'}>
            {'Sign up'}
          </SignUpText>
        </Padded>
      </FullForm>
    </Column>
  );
};
