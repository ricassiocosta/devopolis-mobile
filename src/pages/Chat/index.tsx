import React from 'react';
import { View } from 'react-native';

import background from '../../assets/chat_underdevelopment_background.jpg';
import heart from '../../assets/heart.png';
import Header from '../../components/Header';
import {
  BackgroundImage,
  Container,
  HeartImage,
  SubTitle,
  SubTitleContainer,
  Title,
} from './styles';

const Chat: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <View>
          <Title>Quase lá!</Title>
          <SubTitleContainer>
            <SubTitle>
              O chat está em construção e em breve teremos novidades!
            </SubTitle>
            <HeartImage source={heart} />
          </SubTitleContainer>
        </View>
        <BackgroundImage source={background} />
      </Container>
    </>
  );
};

export default Chat;
