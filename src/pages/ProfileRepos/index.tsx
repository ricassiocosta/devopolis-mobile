import React, { useEffect, useState } from 'react';

import { Linking, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../services/posts';
import { getDevInfo, follow, unfollow, getRepos } from '../../services/dev';

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
  RepoContainer,
  RepoHistory,
  RepoTitle,
  Stats,
  UnfollowButton,
  UnfollowButtonText,
} from './styles';
import { setDevInfo } from '../../store/actions/dev';
import { IDevInfo } from '../../interfaces/IDevInfo';
import { IRepo } from '../../interfaces/IRepo';
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
  const [repos, setRepos] = useState<IRepo[]>([]);
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
      let dev = await getDevInfo(username);
      if (dev.followedList) {
        setProfileInfo(dev);
        const connections = dev.followedList.length;
        setProfileConnections(connections);
      }

      dev = await getDevInfo(loggedDev.state.github_username);
      setLoggedDevInfo(dev);
    }
    getDev();
  }, [loggedDev.state.github_username, username]);

  useEffect(() => {
    async function callApi() {
      const returnedPosts = await getPosts(username);
      if (returnedPosts) {
        setPosts(returnedPosts);
      }
    }
    callApi();
  }, [username]);

  useEffect(() => {
    async function callApi() {
      const returnedRepos = await getRepos(username);
      if (returnedRepos) {
        setRepos(returnedRepos);
      }
    }
    callApi();
  }, [username]);

  useEffect(() => {
    function verifyFollow() {
      if (loggedDev.state.github_username === username) {
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
              <Stats>{`${posts.length} Publicações | ${profileConnections} Conexões`}</Stats>
            </View>
          </DevHeaderInfoContainer>
        </DevHeader>
        <Divider />
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
