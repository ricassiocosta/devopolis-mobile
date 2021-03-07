import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fcfdfe;
`;

export const Title = styled.Text`
  font-family: 'Arvo-Bold';
  font-size: 24px;
  color: #004686;
  width: 240px;
  margin: 60px 24px;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 200px;
  height: 46px;
  margin-top: 48px;
  align-self: center;
  background-color: #008cff;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const LoginText = styled.Text`
  font-size: 14px;
  font-family: 'Arvo-Bold';
  color: #fff;
`;

export const Background = styled.Image`
  width: 100%;
  z-index: -1;
`;
