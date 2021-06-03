import React, { useEffect, useState } from 'react';

import { Linking, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { follow, unfollow, getRepos } from '../../services/dev';

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
  PageTitle,
  RepoContainer,
  RepoHistory,
  RepoTitle,
  Stats,
  UnfollowButton,
  UnfollowButtonText,
} from './styles';
import { IDevInfo } from '../../interfaces/IDevInfo';
import { IRepo } from '../../interfaces/IRepo';
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
  const [repos, setRepos] = useState<IRepo[]>([]);
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
        const profileString = await AsyncStorage.getItem('PROFILE_INFO');
        if (profileString) {
          const profile = JSON.parse(profileString) as IDevInfo;
          if (profile) {
            setProfileInfo(profile);
          }
        }
      }
    }
    getProfile();
  }, [route.params.username]);

  useEffect(() => {
    async function getProfilePosts() {
      if (profileInfo) {
        const returnedPostsString = await AsyncStorage.getItem('PROFILE_POSTS');
        if (returnedPostsString) {
          const returnedPosts = JSON.parse(returnedPostsString) as IPost[];
          if (returnedPosts) {
            setPosts(returnedPosts);
          }
        }
      }
    }
    setPosts([]);
    getProfilePosts();
  }, [profileInfo]);

  useEffect(() => {
    async function callApi() {
      if (profileInfo) {
        const returnedRepos = await getRepos(profileInfo.github_username);
        if (returnedRepos) {
          setRepos(returnedRepos);
        }
      }
    }
    callApi();
  }, [profileInfo]);

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

  async function handleOpenRepo(repo: IRepo) {
    await Linking.openURL(repo.html_url);
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
              <Stats>{`${posts.length} Publicações | ${profileInfo?.followedList.length} Conexões`}</Stats>
            </View>
          </DevHeaderInfoContainer>
        </DevHeader>
        <Divider />
        <PageTitle>Repositórios</PageTitle>
        {repos && repos.length > 0 && (
          <RepoHistory>
            <FlatList
              data={repos}
              horizontal={false}
              keyExtractor={item => item.full_name}
              numColumns={1}
              renderItem={({ item }) => (
                <RepoContainer onPress={() => handleOpenRepo(item)}>
                  <RepoTitle>{item.name}</RepoTitle>
                  {item.description && <Text>{`"${item.description}"`}</Text>}
                  <Text style={{ marginTop: 2 }}>
                    Stars: {item.stargazers_count} Forks: {item.forks}
                  </Text>
                  {item.language && <Text>Linguagem: {item.language}</Text>}
                </RepoContainer>
              )}
            />
          </RepoHistory>
        )}
      </Container>
    </>
  );
};

export default Profile;
