import { IDevInfo } from '../../interfaces/IDevInfo';
import { IRepo } from '../../interfaces/IRepo';
import api from '../api';

export async function getDevInfo(username: string): Promise<IDevInfo> {
  const response = await api.get(`/devs/${username}`);
  return response.data as IDevInfo;
}

export async function follow(username: string): Promise<IDevInfo> {
  const response = await api.post(`/devs/${username}/follow`);
  return response.data as IDevInfo;
}

export async function unfollow(username: string): Promise<IDevInfo> {
  const response = await api.delete(`/devs/${username}/unfollow`);
  return response.data as IDevInfo;
}

export async function getLikedPosts(username: string): Promise<string[]> {
  const response = await api.get(`/devs/${username}/liked_posts`);
  return response.data as string[];
}

export async function getRepos(username: string): Promise<IRepo[]> {
  const response = await api.get(`/devs/${username}/repos`);
  return response.data as IRepo[];
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
