import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDashboard } from '../../services/dashboard';

import Header from '../../components/Header';
import Post from '../../components/Post';

import { Container, FeedLoading } from './styles';
import { IPost } from '../../interfaces/IPost';

const Feed: React.FC = () => {
  const navigation = useNavigation();

  const [feed, setFeed] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    HandleRefresh();
  }, [HandleRefresh]);

  const mountPost: React.FC<IPost> = (post: IPost) => {
    return (
      <Post
        key={post._id}
        id={post._id}
        author={post.author}
        authorPhoto={post.authorPhoto}
        post={post.post}
        thumbnail={post.thumbnail}
      />
    );
  };

  return (
    <>
      <Header searchEnabled />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />
        }
      >
        <Container>
          {feed.length > 0 && !refreshing ? (
            feed.map(post => mountPost(post)).reverse()
          ) : (
            <FeedLoading size='large' color='#008cff' />
          )}
        </Container>
      </ScrollView>
    </>
  );
};

export default Feed;
