import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import { IDevInfo } from '../../interfaces/IDevInfo';
import { IPost } from '../../interfaces/IPost';
import getLoggedDevInfo from '../../utils/getLoggedDevInfo';

interface Props {
  route: {
    params: {
      username: string;
    };
  };
}

const Profile: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();

  const [profileInfo, setProfileInfo] = useState<IDevInfo>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
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
    async function getProfile() {
      if (route.params.username) {
        const profile = await getDevInfo(route.params.username);
        if (profile) {
          await AsyncStorage.setItem('PROFILE_INFO', JSON.stringify(profile));
          setProfileInfo(profile);
        }
      }
    }
    getProfile();
  }, [route.params.username]);

  useEffect(() => {
    function verifyFollow() {
      if (loggedDev && profileInfo) {
        if (profileInfo.github_username !== loggedDev.github_username) {
          setIsOwnProfile(false);
        }

        if (loggedDev.followedList.includes(profileInfo._id)) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      }
    }
    setIsOwnProfile(true);
    verifyFollow();
  }, [loggedDev, profileInfo]);

  useEffect(() => {
    async function getProfilePosts() {
      if (profileInfo) {
        const returnedPosts = await getPosts(profileInfo.github_username);
        if (returnedPosts) {
          await AsyncStorage.setItem(
            'PROFILE_POSTS',
            JSON.stringify(returnedPosts),
          );
          setPosts(returnedPosts);
        }
      }
    }
    setPosts([]);
    getProfilePosts();
  }, [profileInfo]);

  async function handleFollow() {
    if (profileInfo) {
      const updatedDev = await follow(profileInfo.github_username);
      if (updatedDev) {
        AsyncStorage.setItem('LOGGED_DEV', JSON.stringify(updatedDev));
      }
    }
    setIsFollowed(true);
  }

  async function handleUnfollow() {
    if (profileInfo) {
      const updatedDev = await unfollow(profileInfo.github_username);
      if (updatedDev) {
        AsyncStorage.setItem('LOGGED_DEV', JSON.stringify(updatedDev));
      }
    }
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
              {posts && profileInfo && (
                <Stats>{`${posts.length} Publicações | ${profileInfo?.followedList.length} Conexões`}</Stats>
              )}
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
