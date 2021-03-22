import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import searchImg from '../../assets/search.png';

import { Container, Logo, Avatar, Search } from './styles';

interface Options {
  avatar_url: string;
  searchEnabled: boolean;
}

const Header: React.FC<Options> = ({ avatar_url, searchEnabled = false }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Logo>Devopolis</Logo>
      {searchEnabled && <Search source={searchImg} />}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Avatar source={{ uri: avatar_url }} />
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
