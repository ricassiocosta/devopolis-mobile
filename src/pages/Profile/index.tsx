import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SolarSystemLoading } from 'react-loadingg';

import { getPosts } from '../../services/posts';
import { getDevInfo, follow, unfollow } from '../../services/dev';

import { setDevInfo } from '../../store/actions/dev';

import Header from '../../components/Header';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [profileConnections, setProfileConnections] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const devUsername = history.location.pathname.split('/', 2)[1];
  const devInfo = useSelector(state => state.dev.devInfo);

  useEffect(() => {
    async function callApi() {
      setIsLoading(true);
      const response = await getPosts(devUsername);
      setPosts(response);
      setIsLoading(false);
    }
    callApi();
  }, [devUsername]);

  useEffect(() => {
    function verifyFollow() {
      if (devInfo.github_username === devUsername) {
        document.querySelector('.unfollowBtn').classList.add('hidden');
        document.querySelector('.followBtn').classList.add('hidden');
        return;
      }

      if (devInfo.followedList.includes(profileInfo._id)) {
        document.querySelector('.unfollowBtn').classList.remove('hidden');
      } else {
        document.querySelector('.followBtn').classList.remove('hidden');
      }
    }
    verifyFollow();
  }, [
    profileInfo._id,
    devUsername,
    devInfo.followedList,
    devInfo.github_username,
    devInfo,
    profileInfo,
  ]);

  return <Header avatar_url={devInfo.avatar_url} />;
};

export default Profile;
