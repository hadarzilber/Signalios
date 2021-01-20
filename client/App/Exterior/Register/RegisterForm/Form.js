import React from 'react';
import { Padded, Row, Column } from 'mui-flex-layout';
import { useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Form, Field } from 'formik';

const FullForm = styled(Form)`
  width: 45%;
`;

const SignInText = styled(Typography)`
  cursor: pointer;
  margin-left: 5px;
  font-size: 15px;
`;

const SignInDescriptionText = styled(Typography)`
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

  const gotoLogin = () => {
    push('/login');
  };

  return (
    <Column height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Row height={'5%'} />
      <FullForm>
        <Padded>
          <Field fullWidth label={'Username'} name={'username'} component={TextField} />
        </Padded>
        <Padded>
          <Field fullWidth label={'First Name'} name={'name.first'} component={TextField} />
        </Padded>
        <Padded>
          <Field label={'Last Name'} fullWidth name={'name.last'} component={TextField} />
        </Padded>
        <Padded>
          <Field type={'email'} fullWidth label={'Email'} name={'email'} component={TextField} />
        </Padded>
        <Padded>
          <Field
            type={'password'}
            fullWidth
            label={'Password'}
            name={'password'}
            component={TextField}
          />
        </Padded>
        <Padded m={1}>
          <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}>
            {'Sign up'}
          </Button>
        </Padded>
        <Padded>
          <SignInDescriptionText variant={'caption'}>
            {'Already have an account?'}
          </SignInDescriptionText>
          <SignInText onClick={gotoLogin} variant={'caption'} color={'secondary'}>
            {'Log in'}
          </SignInText>
        </Padded>
      </FullForm>
    </Column>
  );
};
