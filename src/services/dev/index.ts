import api from '../api';

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

export async function getDevInfo(username: string): Promise<DevInfo> {
  const response = await api.get(`/devs/${username}`);
  return response.data as DevInfo;
}

export async function follow(username: string): Promise<DevInfo> {
  const response = await api.post(`/devs/${username}/follow`);
  return response.data as DevInfo;
}

export async function unfollow(username: string): Promise<DevInfo> {
  const response = await api.delete(`/devs/${username}/unfollow`);
  return response.data as DevInfo;
}
