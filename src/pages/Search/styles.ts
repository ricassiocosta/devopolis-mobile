import { Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;

  padding: 16px;
`;

export const SearchContainer = styled.View`
  background-color: #eee;
  border-radius: 8px;

  flex-direction: row;
  align-items: center;
`;

export const SearchIcon = styled(Image)`
  width: 24px;
  height: 24px;

  margin-left: 8px;
`;

export const SearchInput = styled.TextInput`
  padding: 8px;
`;

export const QueriedDev = styled.TouchableOpacity`
  flex-direction: row;

  align-items: center;
  padding: 16px;
`;

export const QueriedDevImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

export const QueriedDevText = styled.Text`
  font-family: 'Roboto-Bold';

  font-size: 16px;
  margin-left: 8px;
`;
