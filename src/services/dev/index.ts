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

export async function getLikedPosts(username: string): Promise<string[]> {
  const response = await api.get(`/devs/${username}/liked_posts`);
  return response.data as string[];
}

export async function likePost(
  username: string,
  post_id: string,
): Promise<string[]> {
  const response = await api.post(`/posts/${username}/${post_id}/like`);

  return response.data as string[];
}

export async function dislikePost(
  username: string,
  post_id: string,
): Promise<string[]> {
  const response = await api.delete(`/posts/${username}/${post_id}/dislike`);

  return response.data as string[];
}
