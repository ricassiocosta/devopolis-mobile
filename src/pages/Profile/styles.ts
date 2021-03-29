import { Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const DevHeader = styled.View`
  flex-direction: row;
  margin-top: 24px;
`;

export const DevHeaderImage = styled(Image)`
  width: 96px;
  height: 96px;
  border-radius: 48px;
`;

export const DevHeaderImageContainer = styled.View`
  width: 128px;
  padding: 16px;
`;

export const DevHeaderInfoContainer = styled.View`
  width: 236px;
`;

export const DevHeaderUsernameContainer = styled.View``;

export const DevName = styled.Text`
  font-family: 'Roboto-Bold';
  margin-bottom: -5px;
`;

export const Bio = styled.Text`
  font-size: 12px;
  margin: 8px 0 8px 0;
`;

export const Stats = styled.Text`
  font-size: 12px;
`;
