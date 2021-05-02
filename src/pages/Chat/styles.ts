import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  background-color: #fff;
`;

export const BackgroundImage = styled(Image)`
  width: ${Dimensions.get('screen').width}px;
  height: 500px;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Bold';
  color: #008cff;

  font-size: 32px;
  margin-left: 16px;
`;

export const SubTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const HeartImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 8px;

  position: absolute;
  right: 108px;
  top: 34px;
`;

export const SubTitle = styled.Text`
  font-family: 'Roboto-Bold';
  color: #008cff;

  font-size: 24px;
  margin-left: 16px;
  padding-right: 16px;
`;
