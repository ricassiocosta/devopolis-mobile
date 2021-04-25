import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector } from 'react-redux';
import searchImg from '../../assets/search.png';

import { Container, Logo, Avatar, SearchImage, Search } from './styles';

interface Options {
  searchEnabled?: boolean;
}

interface State {
  dev: {
    devInfo: {
      github_username: string;
      avatar_url: string;
    };
  };
}

const Header: React.FC<Options> = ({ searchEnabled = false }) => {
  const navigation = useNavigation();
  const devInfo = useSelector((state: State) => ({
    state: state.dev.devInfo,
  }));

  function handleSearch() {
    navigation.navigate('Search');
  }

  return (
    <Container>
      <Logo>Devopolis</Logo>
      {searchEnabled && (
        <Search onPress={handleSearch}>
          <SearchImage source={searchImg} />
        </Search>
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Profile', {
            username: devInfo.state.github_username,
          })
        }
      >
        <Avatar source={{ uri: devInfo.state.avatar_url }} />
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
