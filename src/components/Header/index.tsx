import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import searchImg from '../../assets/search.png';

import { Container, Logo, Avatar, SearchImage, Search } from './styles';
import getLoggedDevInfo from '../../utils/getLoggedDevInfo';
import { IDevInfo } from '../../interfaces/IDevInfo';

interface Options {
  searchEnabled?: boolean;
}

const Header: React.FC<Options> = ({ searchEnabled = false }) => {
  const navigation = useNavigation();
  const [loggedDev, setLoggedDev] = useState<IDevInfo>();

  useEffect(() => {
    async function getLoggedDev() {
      try {
        const devInfo = await getLoggedDevInfo();
        setLoggedDev(devInfo);
      } catch (err) {
        throw new Error(err);
      }
    }

    getLoggedDev();
  }, [navigation]);

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
      {loggedDev && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              username: loggedDev.github_username,
            })
          }
        >
          <Avatar source={{ uri: loggedDev.avatar_url }} />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Header;
