import React from 'react';
import { Typography, Paper, Divider } from '@material-ui/core';
import { Column, Row } from 'mui-flex-layout';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useAuthApi from '../../hooks/api/auth.hook';
import { useAlert } from '../../Providers/AlertProvider';
import { useAuth } from '../../Providers/AuthProvider';

import Logo from '../../../assets/new/biglogo.png';
import LoginForm from './LoginForm';

const LoginPaper = styled(Paper)`
  && {
    width: 80%;
    height: 80%;
    border-radius: 15px;
    background: linear-gradient(45deg, #d0d1ff, #efeefe);
  }
`;

const Title = styled(Typography)`
  font-weight: 500;
  font-size: 50px;
  color: white;
  letter-spacing: 0.05rem;
`;

const LayoutDivider = styled(Divider)`
  height: 100%;
  width: 2px;
`;

const Icon = styled.img`
  margin: 10px;
`;

const Login = styled(Column)`
  background: linear-gradient(45deg, #d0d1ff, #efeefe);
`;

const AuthWrapper = styled(Column)`
  background-color: white;
`;

export default () => {
  // const { open } = useAlert();
  const { push } = useHistory();
  const { login } = useAuthApi();
  const { setAuth } = useAuth();

  const handleLogin = async ({ email, password }, { setSubmitting }) => {
    try {
      const data = await login({ email, password });

      await setAuth(data);

      push('/home');
    } catch (error) {
      setSubmitting(false);

      open({ message: error });
    }
  };

  return (
    <Login width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <LoginPaper elevation={0}>
        <Row width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
          <Column alignItems={'center'} width={'40%'} height={'100%'} justifyContent={'center'}>
            <Icon src={Logo} style={{ height: '350px', width: '400px' }} />
            <Title>{'Signalios'}</Title>
          </Column>
          <LayoutDivider />
          <AuthWrapper
            width={'60%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <LoginForm handleSubmit={handleLogin} />
          </AuthWrapper>
        </Row>
      </LoginPaper>
    </Login>
  );
};
