import React, { useEffect, useState } from 'react';

import { /* Image, */ Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getPosts } from '../../services/posts';
import { getDevInfo /* follow, unfollow */ } from '../../services/dev';

import Header from '../../components/Header';
import { Container } from '../Login/styles';
import {
  Bio,
  DevHeader,
  DevHeaderImage,
  DevHeaderImageContainer,
  DevHeaderInfoContainer,
  DevName,
  Divider,
  PostHistory,
  PostThumbnail,
  Stats,
  ThumbnailContainer,
} from './styles';

interface DevInfo {
  _id: string;
  name: string;
  github_username: string;
  avatar_url: string;
  bio: string;
  followedList: string[];
  likedPosts: string[];
  techs: string[];
}

interface Post {
  _id: string;
  author: string;
  thumbnail: string;
  title: string;
  post: string;
}

interface Props {
  route: {
    params: {
      username: string;
    };
  };
}

const Profile: React.FC<Props> = ({ route }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profileInfo, setProfileInfo] = useState<DevInfo>();
  const [profileConnections, setProfileConnections] = useState(0);
  // const [isFollowed, setIsFollowed] = useState(false);
  // const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(route.params.username);
  }, [route.params.username]);

  useEffect(() => {
    async function getDev() {
      const dev = await getDevInfo(username);
      if (dev.followedList) {
        setProfileInfo(dev);
        const connections = dev.followedList.length;
        setProfileConnections(connections);
      }
    }
    getDev();
  }, [username]);

  useEffect(() => {
    async function callApi() {
      const returnedPosts = await getPosts(username);
      if (returnedPosts) {
        setPosts(returnedPosts);
      }
    }
    callApi();
  }, [username]);

  /*
  useEffect(() => {
    function verifyFollow() {
      if (devInfo.github_username === username) {
        setIsOwnProfile(true);
        return;
      }

      if (!profileInfo) {
        return;
      }

      if (devInfo.followedList.includes(profileInfo._id)) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    }
    verifyFollow();
  }, [devInfo.followedList, devInfo.github_username, profileInfo, username]);

  async function handleFollow() {
    const response = await follow(username);
    dispatch(setDevInfo(response));
    setIsFollowed(true);
  }

  async function handleUnfollow() {
    const response = await unfollow(username);
    dispatch(setDevInfo(response));
    setIsFollowed(false);
  }
  */

  return (
    <>
      <Header />
      <Container>
        <DevHeader>
          <DevHeaderImageContainer>
            {profileInfo && (
              <DevHeaderImage source={{ uri: profileInfo.avatar_url }} />
            )}
          </DevHeaderImageContainer>
          <DevHeaderInfoContainer>
            <View>
              <DevName>{profileInfo?.name}</DevName>
              <Text>{profileInfo?.github_username}</Text>
              <Bio>{`"${profileInfo?.bio}"`}</Bio>
              <Stats>{`${posts.length} Publicações | ${profileConnections} Conexões`}</Stats>
            </View>
          </DevHeaderInfoContainer>
        </DevHeader>
        <Divider />
        <PostHistory>
          {posts && (
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              data={posts.reverse()}
              horizontal={false}
              keyExtractor={item => item._id}
              numColumns={3}
              renderItem={({ item }) => (
                <ThumbnailContainer>
                  <PostThumbnail
                    key={item.title}
                    source={{ uri: `data:image/png;base64,${item.thumbnail}` }}
                  />
                </ThumbnailContainer>
              )}
            />
          )}
        </PostHistory>
      </Container>
    </>
  );
};

export default Profile;
