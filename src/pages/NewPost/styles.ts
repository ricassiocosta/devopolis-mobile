import { Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #fff;
`;

export const NewPostHeader = styled.View`
  margin: 8px auto;
  width: 350px;
`;

export const NewPostHeaderTitle = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  color: #424b54;

  margin-top: 16px;
`;

export const NewPostContainer = styled(RectButton)`
  background-color: #ddd;
  width: ${Dimensions.get('screen').width}px;
  max-height: ${Dimensions.get('screen').width}px;
  flex: 1;
`;

export const NewPostImage = styled(Image)`
  width: ${Dimensions.get('screen').width}px;
  max-height: ${Dimensions.get('screen').width}px;
  flex: 1;
`;

export const NewPostDescriptionContainer = styled.View`
  margin: 4px auto;
  width: 350px;
`;

export const NewPostDescription = styled.TextInput`
  font-family: 'Roboto-Bold';
`;

export const Divider = styled.View`
  margin: 8px auto;
  width: 350px;
  border-color: #c4c4c4;
  border: 0.5px;
`;

export const CameraImg = styled(Image)`
  margin: auto auto;
`;
