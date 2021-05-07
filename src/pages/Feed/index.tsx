import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { getDashboard } from '../../services/dashboard';
import { logout } from '../../store/actions';

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
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function callApi() {
      try {
        const receivedPosts = await getDashboard();
        setPosts(receivedPosts);
      } catch (error) {
        dispatch(logout());
      }
    }
    callApi();
  }, [dispatch]);

  const HandleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    async function callApi() {
      try {
        const receivedPosts = await getDashboard();
        setPosts(receivedPosts);
      } catch (error) {
        dispatch(logout());
      }
    }
    callApi();
    setRefreshing(false);
  }, [dispatch]);

  return (
    <>
      <Header searchEnabled />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />
        }
      >
        <Container>
          {posts &&
            posts
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
