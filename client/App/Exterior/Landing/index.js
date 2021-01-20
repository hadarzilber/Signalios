import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'mui-flex-layout';
import { useHistory } from 'react-router-dom';
import { Button, Card, Typography, Tooltip } from '@material-ui/core';

import google from '../../../assets/new/google.svg';
import apple from '../../../assets/apple.svg';
import Icon from '../../../assets/new/biglogo.png';
import Landing1 from '../../../assets/new/1.png';
import Landing2 from '../../../assets/new/2.png';
import Landing3 from '../../../assets/new/3.png';
import Landing4 from '../../../assets/new/landing4.png';

const Logo = styled.img`
  margin-right: 15px;
  height: 100px;
`;

const Landing = styled(Column)`
  background: black;
`;

const Title = styled(Typography)`
  font-weight: 500;
  color: white;
  letter-spacing: 0.05rem;
`;

const LandingImage = styled.img`
  width: 100%;
  border: none;
`;

const SocialImage = styled.img`
  height: 80%;
  width: 90%;
`;

const Slogan = styled(Typography)`
  color: white;
  font-size: 50px;
  font-style: italic;
  font-weight: 100;
`;

const DescriptionHeader = styled(Typography)`
  font-weight: bolder;
  font-size: 20px;
  text-align: center;
  color: white;
`;

const DescriptionText = styled(Typography)`
  font-weight: 100;
  font-size: 15px;
  text-align: center;
  color: white;
`;

const Apple = styled.img`
  width: 40%;
`;

const Google = styled.img`
  width: 50%;
`;

const AuthButton = styled(Button)`
  color: white;
  border-radius: 15px;
  margin-right: 15px;
`;

const DescriptionCard = styled(Card)`
  height: 40%;
  width: 40%;
  margin-right: 50px;
  border-radius: 25px;
  background-color: #0000001c;
`;

export default () => {
  const { push } = useHistory();

  const gotoLogin = () => {
    push('/login');
  };

  const gotoRegister = () => {
    push('/register');
  };

  return (
    <Landing width={'100%'} height={'100%'}>
      <Row height={'15%'} width={'100%'} alignItems={'center'}>
        <Row width={'100%'} height={'100%'} alignItems={'center'}>
          <Row width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Row alignItems={'center'} justifyContent={'center'} width={'20%'}>
              <Title variant={'h3'} color={'inherit'}>
                {'Signalios'}
              </Title>
            </Row>
            <Row m={2}>
              <AuthButton
                onClick={gotoLogin}
                size={'large'}
                color={'primary'}
                variant={'contained'}
              >
                {'Log in'}
              </AuthButton>
              <AuthButton onClick={gotoRegister} size={'large'}>
                {'Sign up'}
              </AuthButton>
            </Row>
          </Row>
        </Row>
      </Row>
      <Row width={'100%'} height={'85%'} justifyContent={'center'} alignItems={'center'}>
        <Column
          height={'100%'}
          width={'100%'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          p={2}
        >
          <Slogan>{'Cryptocurrency in your hand'}</Slogan>
          <Row width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
            {/* <DescriptionCard elevation={0}>
              <Column alignItems={'center'} justifyContent={'center'} p={2}>
                <SocialImage src={Landing3} />
                <DescriptionHeader variant={'h5'}>{'Notes & Lists'}</DescriptionHeader>
                <DescriptionText>
                  {'Organize and keep track of your tasks and lists'}
                </DescriptionText>
              </Column>
            </DescriptionCard>
            <DescriptionCard elevation={0}>
              <Column alignItems={'center'} justifyContent={'center'} p={2}>
                <SocialImage src={Landing2} />
                <DescriptionHeader variant={'h5'}>{'Explore Templates'}</DescriptionHeader>
                <DescriptionText>
                  {'Export your lists into Templates and explore to find new ones'}
                </DescriptionText>
              </Column>
            </DescriptionCard>
            <DescriptionCard elevation={0}>
              <Column alignItems={'center'} justifyContent={'center'} p={2}>
                <SocialImage src={Landing1} />
                <DescriptionHeader variant={'h5'}>{'Collaborate & Share'}</DescriptionHeader>
                <DescriptionText>
                  {'Share your templates with your friends, and fork trendy ones'}
                </DescriptionText>
              </Column>
            </DescriptionCard> */}
          </Row>
        </Column>
        <Column width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
          <LandingImage src={Landing4} />
          <Row alignItems={'center'}>
            <Tooltip title={'Coming soon'}>
              <Apple src={apple} />
            </Tooltip>
            <Tooltip title={'Coming soon'}>
              <Google src={google} />
            </Tooltip>
          </Row>
        </Column>
      </Row>
    </Landing>
  );
};
