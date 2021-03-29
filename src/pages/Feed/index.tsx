import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
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

  return (
    <>
      <Header searchEnabled />
      <ScrollView>
        <Container>
          {posts &&
            posts
              .map(post => (
                <Post
                  key={post._id}
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
