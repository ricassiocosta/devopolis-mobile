import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector } from 'react-redux';
import searchImg from '../../assets/search.png';

import { Container, Logo, Avatar, Search } from './styles';

interface Options {
  searchEnabled?: boolean;
}

const Header: React.FC<Options> = ({ searchEnabled = false }) => {
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const devInfo = useSelector(state => state.dev.devInfo);

  return (
    <Container>
      <Logo>Devopolis</Logo>
      {searchEnabled && <Search source={searchImg} />}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Profile', { username: devInfo.github_username })
        }
      >
        <Avatar source={{ uri: devInfo.avatar_url }} />
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
