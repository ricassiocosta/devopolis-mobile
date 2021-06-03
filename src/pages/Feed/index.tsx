import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDashboard } from '../../services/dashboard';

import Header from '../../components/Header';
import Post from '../../components/Post';

import { Container } from './styles';

interface PostInterface {
  _id: string;
  author: string;
  authorPhoto: string;
  post: string;
  thumbnail: string;
}

const Feed: React.FC = () => {
  const navigation = useNavigation();

  const [feed, setFeed] = useState<PostInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getFeed() {
      try {
        const receivedPosts = await getDashboard();
        setFeed(receivedPosts);
      } catch (error) {
        await AsyncStorage.setItem('TOKEN', '');
        navigation.navigate('Login');
      }
    }
    getFeed();
  }, [navigation]);

  const HandleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    async function refreshFeed() {
      try {
        const receivedPosts = await getDashboard();
        setFeed(receivedPosts);
      } catch (error) {
        await AsyncStorage.setItem('TOKEN', '');
        navigation.navigate('Login');
      }
    }
    refreshFeed();
    setRefreshing(false);
  }, [navigation]);

  return (
    <>
      <Header searchEnabled />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />
        }
      >
        <Container>
          {feed &&
            feed
              .map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.author}
                  authorPhoto={post.authorPhoto}
                  post={post.post}
                  thumbnail={post.thumbnail}
                />
              ))
              .reverse()}
        </Container>
      </ScrollView>
    </>
  );
};

export default Feed;
