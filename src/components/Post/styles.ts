import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
  width: 100%;
  margin: 0 auto 20px;
  background: #fbfbfb;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
`;

export const PostTitle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const Avatar = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

export const DevUsername = styled.Text`
  font-family: 'Roboto-Bold';
`;

export const DescriptionField = styled.View`
  flex-direction: row;
  padding: 8px;
`;

export const Description = styled.Text`
  margin-left: 8px;
`;

export const Like = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PostImage = styled(Image)`
  height: 400px;
`;
