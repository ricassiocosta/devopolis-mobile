import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import Header from '../../components/Header';

import {
  NewPostHeader,
  NewPostHeaderTitle,
  Divider,
  NewPostContainer,
  NewPostDescription,
  NewPostDescriptionContainer,
  CameraImg,
  NewPostImage,
} from './styles';

import cameraImg from '../../assets/camera.png';

const NewPost: React.FC = () => {
  const [postImage, setPostImage] = useState<Image>();

  function handleSelectPostImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setPostImage(image);
    });
  }

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
          {postImage ? (
            <NewPostImage
              source={{
                uri: `data:${postImage.mime};base64,${postImage.data}`,
              }}
            />
          ) : (
            <NewPostContainer onPress={() => handleSelectPostImage()}>
              <CameraImg source={cameraImg} />
            </NewPostContainer>
          )}
          <NewPostDescriptionContainer>
            <NewPostDescription placeholder='No que você está pensando?' />
          </NewPostDescriptionContainer>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewPost;
