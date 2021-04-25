import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
  height: 48px;
  width: 100%;
  background: #008cff;
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  justify-content: space-between;
`;

export const Logo = styled.Text`
  font-family: 'Arvo-Bold';
  font-size: 24px;
  color: #fff;
`;

export const Avatar = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const SearchImage = styled(Image)`
  margin-left: 100px;
`;

export const Search = styled.TouchableOpacity``;
