import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
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
import likedImg from '../../assets/liked.png';
import { dislikePost, getLikedPosts, likePost } from '../../services/dev';

interface Options {
  authorPhoto: string;
  id: string;
  author: string;
  post: string;
  thumbnail: string;
}

interface State {
  dev: {
    devInfo: {
      github_username: string;
    };
  };
}

const Post: React.FC<Options> = ({
  authorPhoto,
  id,
  author,
  post,
  thumbnail,
}) => {
  const [likedPosts, setLikedPosts] = useState<string[]>(['']);
  const navigation = useNavigation();
  const devInfo = useSelector((state: State) => ({
    state: state.dev.devInfo,
  }));

  useEffect(() => {
    const liked = getLikedPosts(devInfo.state.github_username);
    liked.then(posts => {
      setLikedPosts(posts);
    });
  }, [devInfo.state.github_username, likedPosts]);

  async function handleDislike(postId: string) {
    const liked = await dislikePost(devInfo.state.github_username, postId);

    setLikedPosts(liked);
  }

  async function handleLike(postId: string) {
    const liked = await likePost(devInfo.state.github_username, postId);

    setLikedPosts(liked);
  }

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

      {likedPosts && likedPosts.includes(id) ? (
        <Like onPress={() => handleDislike(id)}>
          <Image
            style={{ marginLeft: 8, marginTop: 8, height: 20, width: 20 }}
            source={likedImg}
          />
        </Like>
      ) : (
        <Like onPress={() => handleLike(id)}>
          <Image
            style={{ marginLeft: 8, marginTop: 8, height: 20, width: 20 }}
            source={likeImg}
          />
        </Like>
      )}

      <DescriptionField>
        <DevUsername>{author}</DevUsername>
        <Description>{post}</Description>
      </DescriptionField>
    </Container>
  );
};

export default Post;
