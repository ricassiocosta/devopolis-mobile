import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import manager from '../../oauth/manager';
import { authenticate } from '../../services/auth';
import { setDevInfo } from '../../store/actions/dev';
import { setToken } from '../../store/actions';
import { getDevInfo } from '../../services/dev';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/github_logo.png';
import background from '../../assets/background.png';

import { Container, Title, LoginButton, LoginText, Background } from './styles';

interface State {
  dev: {
    devInfo: {
      username: string;
    };
  };
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loggedDev = useSelector((state: State) => ({
    state: state.dev.devInfo,
  }));

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('TOKEN');
      const username = await AsyncStorage.getItem('USERNAME');
      if (token && username) {
        const devInfo = await getDevInfo(username);
        dispatch(setDevInfo(devInfo));

        navigation.navigate('NavigationTabs');
      }
    }

    getTokenFromStorage();
  }, [dispatch, loggedDev.state.username, navigation]);

  async function handleLogin() {
    const response = await manager.authorize('github');
    const githubToken = response.response.credentials.accessToken;
    const { token, username } = await authenticate(githubToken);

    await AsyncStorage.setItem('TOKEN', token);
    await AsyncStorage.setItem('USERNAME', username);

    dispatch(setToken(token));
    const devInfo = await getDevInfo(username);
    dispatch(setDevInfo(devInfo));

    navigation.navigate('NavigationTabs');
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
