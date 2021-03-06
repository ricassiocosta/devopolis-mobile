import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header';
import { search } from '../../services/search';
import {
  Container,
  QueriedDev,
  QueriedDevImage,
  QueriedDevText,
  SearchContainer,
  SearchIcon,
  SearchInput,
} from './styles';

import searchImg from '../../assets/search-icon.png';
import { IDevInfo } from '../../interfaces/IDevInfo';

const Profile: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [queriedDevs, setQueriedDevs] = useState<IDevInfo[]>([]);
  const navigation = useNavigation();

  const onSearch = async (text: string) => {
    const searchQueryText = text;
    setSearchQuery(searchQueryText);

    if (searchQuery.length >= 3) {
      try {
        const devs = await search(searchQuery);
        if (devs) {
          setQueriedDevs(devs);
        }
      } catch (err) {
        await AsyncStorage.setItem('TOKEN', '');
        navigation.navigate('Login');
      }
    } else {
      setQueriedDevs([]);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <SearchContainer>
          <SearchIcon source={searchImg} />
          <SearchInput
            placeholder='Pesquisar'
            autoFocus
            onChangeText={text => onSearch(text)}
          />
        </SearchContainer>
        {queriedDevs &&
          queriedDevs.map(dev => {
            return (
              <QueriedDev
                key={dev._id}
                onPress={() =>
                  navigation.navigate('Profile', {
                    username: dev.github_username,
                  })
                }
              >
                <QueriedDevImage source={{ uri: dev.avatar_url }} />
                <QueriedDevText style={{ color: '#000' }}>
                  {dev.name}
                </QueriedDevText>
              </QueriedDev>
            );
          })}
      </Container>
    </>
  );
};

export default Profile;
