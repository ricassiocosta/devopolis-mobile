import React from 'react';
import { Image } from 'react-native';

import { Container, Title, LoginButton, LoginText, Background } from './styles';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/github_logo.png';
import background from '../../assets/background.png';

const Login: React.FC = () => (
  <Container>
    <Title>
      Junte-se a milhares de devs e transforme o mundo com suas ideias!
    </Title>
    <Image style={{ alignSelf: 'center' }} source={logo} />
    <LoginButton>
      <Image source={githubLogo} />
      <LoginText>Entrar com Github</LoginText>
    </LoginButton>
    <Background source={background} />
  </Container>
);

export default Login;
