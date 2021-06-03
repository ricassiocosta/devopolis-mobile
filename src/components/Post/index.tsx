import React, { useEffect, useState } from 'react';
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
import likedImg from '../../assets/liked.png';
import { dislikePost, getLikedPosts, likePost } from '../../services/dev';
import { IDevInfo } from '../../interfaces/IDevInfo';
import getLoggedDevInfo from '../../utils/getLoggedDevInfo';

interface Options {
  authorPhoto: string;
  id: string;
  author: string;
  post: string;
  thumbnail: string;
}

const Post: React.FC<Options> = ({
  authorPhoto,
  id,
  author,
  post,
  thumbnail,
}) => {
  const navigation = useNavigation();
  const [likedPosts, setLikedPosts] = useState<string[]>(['']);
  const [loggedDev, setLoggedDev] = useState<IDevInfo>();

  useEffect(() => {
    async function getLoggedDev() {
      try {
        const devInfo = await getLoggedDevInfo();
        setLoggedDev(devInfo);
      } catch (err) {
        console.log(err);
        navigation.navigate('Login');
      }
    }

    getLoggedDev();
  }, [navigation]);

  useEffect(() => {
    if (loggedDev) {
      const liked = getLikedPosts(loggedDev.github_username);
      liked
        .then(posts => {
          setLikedPosts(posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedDev, likedPosts]);

  function handleDislike(postId: string) {
    if (loggedDev) {
      const liked = dislikePost(loggedDev.github_username, postId);
      liked
        .then(posts => {
          setLikedPosts(posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleLike(postId: string) {
    if (loggedDev) {
      const liked = likePost(loggedDev.github_username, postId);
      liked
        .then(posts => {
          setLikedPosts(posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
