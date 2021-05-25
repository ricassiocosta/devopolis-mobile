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

export const PageTitle = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 20px;
  margin-left: 16px;
`;

export const RepoHistory = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width + 2}px;
  margin-left: -1px;
  margin-top: 8px;
`;

export const RepoContainer = styled.TouchableOpacity`
  margin: 8px 16px;
  background: #fbfbfb;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  padding: 8px;
`;

export const RepoTitle = styled.Text`
  font-family: 'Roboto-Bold';
  margin-bottom: 2px;
`;

export const FollowButton = styled.TouchableOpacity`
  position: absolute;
  width: 80px;
  height: 24px;
  background-color: #008cff;

  right: 0;
  top: 4px;

  border-radius: 4px;

  align-items: center;
  z-index: 1;
`;

export const FollowButtonText = styled.Text`
  color: white;
  font-family: 'Roboto-Bold';

  line-height: 20px;
`;

export const UnfollowButton = styled.TouchableOpacity`
  position: absolute;
  width: 100px;
  height: 24px;
  background-color: #f5381f;

  right: 0;
  top: 4px;

  border-radius: 4px;

  align-items: center;
  z-index: 1;
`;

export const UnfollowButtonText = styled.Text`
  color: white;
  font-family: 'Roboto-Bold';
  font-size: 12px;

  line-height: 20px;
`;
