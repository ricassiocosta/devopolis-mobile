import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width}px;
  min-height: ${Dimensions.get('screen').height}px;
  background-color: #fff;
`;

export const FeedLoading = styled.ActivityIndicator`
  margin-top: 300px;
`;
