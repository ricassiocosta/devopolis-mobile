import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

import {
  NewPostHeader,
  NewPostHeaderTitle,
  Divider,
  NewPostContainer,
  NewPostDescription,
  NewPostDescriptionContainer,
  CameraImg,
} from './styles';

import cameraImg from '../../assets/camera.png';

const NewPost: React.FC = () => {
  return (
    <>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        enabled
      >
        <SafeAreaView style={{ flex: 1 }}>
          <NewPostHeader>
            <NewPostHeaderTitle>Inicie uma publicação</NewPostHeaderTitle>
            <Divider />
          </NewPostHeader>
          <NewPostContainer>
            <CameraImg source={cameraImg} />
          </NewPostContainer>
          <NewPostDescriptionContainer>
            <NewPostDescription placeholder='No que você está pensando?' />
          </NewPostDescriptionContainer>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewPost;
