import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
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
  PublishButton,
  PublishButtonText,
} from './styles';

import cameraImg from '../../assets/camera.png';
import { createPost } from '../../services/posts';

const NewPost: React.FC = () => {
  const [postImage, setPostImage] = useState<Image>();
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

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

  async function handlePublish() {
    if (description && postImage) {
      if (postImage.data) {
        createPost(description, postImage.data);
      }
    }

    setDescription('');
    setPostImage(undefined);
    Alert.alert('Post enviado com sucesso!');
    Keyboard.dismiss();
    navigation.navigate('Home');
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
            <PublishButton onPress={handlePublish}>
              <PublishButtonText>Publicar</PublishButtonText>
            </PublishButton>
          </NewPostHeader>
          {postImage ? (
            <NewPostContainer onPress={() => handleSelectPostImage()}>
              <NewPostImage
                source={{
                  uri: `data:${postImage.mime};base64,${postImage.data}`,
                }}
              />
            </NewPostContainer>
          ) : (
            <NewPostContainer onPress={() => handleSelectPostImage()}>
              <CameraImg source={cameraImg} />
            </NewPostContainer>
          )}
          <NewPostDescriptionContainer>
            <NewPostDescription
              placeholder='No que você está pensando?'
              value={description}
              onChangeText={setDescription}
            />
          </NewPostDescriptionContainer>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewPost;
