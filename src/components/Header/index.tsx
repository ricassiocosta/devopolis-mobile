import React from 'react';

import searchImg from '../../assets/search.png';

import { Container, Logo, Avatar, Search } from './styles';

interface Options {
  avatar_url: string;
  searchEnabled: boolean;
}

const Header: React.FC<Options> = ({ avatar_url, searchEnabled = false }) => (
  <Container>
    <Logo>Devopolis</Logo>
    {searchEnabled && <Search source={searchImg} />}
    <Avatar source={{ uri: avatar_url }} />
  </Container>
);

export default Header;
