import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getPosts } from '../../services/posts';
import { getDevInfo, follow, unfollow } from '../../services/dev';

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
  FollowButton,
  FollowButtonText,
  PostHistory,
  PostThumbnail,
  Stats,
  ThumbnailContainer,
  UnfollowButton,
  UnfollowButtonText,
} from './styles';
import { setDevInfo } from '../../store/actions/dev';
import { IDevInfo } from '../../interfaces/IDevInfo';
import { IPost } from '../../interfaces/IPost';

interface Props {
  route: {
    params: {
      username: string;
    };
  };
}

interface State {
  dev: {
    devInfo: {
      github_username: string;
    };
  };
}

const Profile: React.FC<Props> = ({ route }) => {
  const [loggedDevInfo, setLoggedDevInfo] = useState<IDevInfo>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [profileInfo, setProfileInfo] = useState<IDevInfo>();
  const [profileConnections, setProfileConnections] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const loggedDev = useSelector((state: State) => ({
    state: state.dev.devInfo,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(route.params.username);
  }, [route.params.username]);

  useEffect(() => {
    async function getDev() {
      if (username) {
        const dev = await getDevInfo(username);
        if (dev.followedList) {
          setProfileInfo(dev);
          const connections = dev.followedList.length;
          setProfileConnections(connections);
        }

        await AsyncStorage.setItem('PROFILE_INFO', JSON.stringify(dev));
        setLoggedDevInfo(dev);
      }
    }
    getDev();
  }, [username]);

  useEffect(() => {
    async function callApi() {
      const returnedPosts = await getPosts(username);
      if (returnedPosts) {
        await AsyncStorage.setItem(
          'PROFILE_POSTS',
          JSON.stringify(returnedPosts),
        );
        setPosts(returnedPosts);
      }
    }
    callApi();
  }, [username]);

  useEffect(() => {
    function verifyFollow() {
      if (username === loggedDev.state.github_username) {
        setIsOwnProfile(true);
        return;
      }

      if (!profileInfo) {
        return;
      }

      if (loggedDevInfo) {
        if (loggedDevInfo.followedList.includes(profileInfo._id)) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      }
    }
    verifyFollow();
  }, [loggedDev.state.github_username, loggedDevInfo, profileInfo, username]);

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
            <View style={{ position: 'relative' }}>
              {isOwnProfile ? (
                <></>
              ) : (
                !isFollowed && (
                  <FollowButton onPress={() => handleFollow()}>
                    <FollowButtonText>Seguir</FollowButtonText>
                  </FollowButton>
                )
              )}
              {isFollowed && (
                <UnfollowButton onPress={() => handleUnfollow()}>
                  <UnfollowButtonText>Deixar de seguir</UnfollowButtonText>
                </UnfollowButton>
              )}
              {profileInfo && (
                <>
                  <DevName>{profileInfo.name}</DevName>
                  <Text>{profileInfo.github_username}</Text>
                  <Bio>{`"${profileInfo.bio}"`}</Bio>
                </>
              )}
              <Stats>{`${posts.length} Publicações | ${profileConnections} Conexões`}</Stats>
            </View>
          </DevHeaderInfoContainer>
        </DevHeader>
        <Divider />
        {posts && posts.length > 0 && (
          <PostHistory>
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
          </PostHistory>
        )}
      </Container>
    </>
  );
};

export default Profile;
