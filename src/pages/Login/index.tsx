import React from 'react';
import { Image } from 'react-native';

import manager from '../../oauth/manager';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/github_logo.png';
import background from '../../assets/background.png';

import { Container, Title, LoginButton, LoginText, Background } from './styles';

const Login: React.FC = () => {
  async function handleLogin() {
    const response = await manager.authorize('github');
    console.log(response);
  }

  return (
    <Container>
      <Title>
        Junte-se a milhares de devs e transforme o mundo com suas ideias!
      </Title>
      <Image style={{ alignSelf: 'center' }} source={logo} />
      <LoginButton onPress={() => handleLogin()}>
        <Image source={githubLogo} />
        <LoginText>Entrar com Github</LoginText>
      </LoginButton>
      <Background source={background} />
    </Container>
  );
};

export default Login;
