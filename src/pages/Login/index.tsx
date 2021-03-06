import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import manager from '../../oauth/manager';
import { authenticate } from '../../services/auth';
import { getDevInfo } from '../../services/dev';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/github_logo.png';
import background from '../../assets/background.png';

import { Container, Title, LoginButton, LoginText, Background } from './styles';

const Login: React.FC = () => {
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const response = await manager.authorize('github');
      const githubToken = response.response.credentials.accessToken;
      const { token, username } = await authenticate(githubToken);

      await AsyncStorage.setItem('TOKEN', token);

      const devInfo = await getDevInfo(username);
      await AsyncStorage.setItem('LOGGED_DEV', JSON.stringify(devInfo));

      navigation.navigate('NavigationTabs');
    } catch (err) {
      throw new Error(err);
    }
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
