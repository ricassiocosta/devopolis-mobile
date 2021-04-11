import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
`;

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
  position: relative;
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
  position: absolute;
  top: 108px;
`;

export const Divider = styled.View`
  margin: 8px auto;
  width: 350px;
  border-color: #c4c4c4;
  border: 0.5px;
`;

export const PostHistory = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width + 2}px;
  margin-left: -1px;
  margin-top: 8px;
`;

export const PostThumbnail = styled(Image)`
  height: ${Dimensions.get('screen').width / 3 + 10}px;
  width: ${Dimensions.get('screen').width / 3}px;
`;

export const ThumbnailContainer = styled.View`
  border: 1px;
  border-style: solid;
  border-color: #fff;
`;
