import React from 'react';
import { Image } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  PostTitle,
  Avatar,
  DevUsername,
  DescriptionField,
  Description,
  PostImage,
  Like,
} from './styles';

import likeImg from '../../assets/like.png';

interface Options {
  authorPhoto: string;
  author: string;
  post: string;
  thumbnail: string;
}

const Post: React.FC<Options> = ({ authorPhoto, author, post, thumbnail }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', { username: author })}
      >
        <PostTitle>
          <Avatar source={{ uri: authorPhoto }} />
          <DevUsername>{author}</DevUsername>
        </PostTitle>
      </TouchableOpacity>
      {thumbnail && (
        <PostImage source={{ uri: `data:image/png;base64,${thumbnail}` }} />
      )}
      <Like>
        <Image
          style={{ marginLeft: 8, marginTop: 8, height: 20, width: 20 }}
          source={likeImg}
        />
      </Like>
      <DescriptionField>
        <DevUsername>{author}</DevUsername>
        <Description>{post}</Description>
      </DescriptionField>
    </Container>
  );
};

export default Post;
