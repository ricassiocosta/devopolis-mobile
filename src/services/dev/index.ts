import { IDevInfo } from '../../interfaces/IDevInfo';
import { IRepo } from '../../interfaces/IRepo';
import { api, getConfig } from '../api';

export async function getDevInfo(username: string): Promise<IDevInfo> {
  const config = await getConfig();
  const response = await api.get(`/devs/${username}`, config);
  return response.data as IDevInfo;
}

export async function follow(username: string): Promise<IDevInfo> {
  const config = await getConfig();
  const response = await api.post(`/devs/${username}/follow`, config);
  return response.data as IDevInfo;
}

export async function unfollow(username: string): Promise<IDevInfo> {
  const config = await getConfig();
  const response = await api.delete(`/devs/${username}/unfollow`, config);
  return response.data as IDevInfo;
}

export async function getLikedPosts(username: string): Promise<string[]> {
  const config = await getConfig();
  const response = await api.get(`/devs/${username}/liked_posts`, config);
  return response.data as string[];
}

export async function getRepos(username: string): Promise<IRepo[]> {
  const config = await getConfig();
  const response = await api.get(`/devs/${username}/repos`, config);
  return response.data as IRepo[];
}

export async function likePost(
  username: string,
  post_id: string,
): Promise<string[]> {
  const config = await getConfig();
  const response = await api.post(`/posts/${username}/${post_id}/like`, config);

  return response.data as string[];
}

export async function dislikePost(
  username: string,
  post_id: string,
): Promise<string[]> {
  const config = await getConfig();
  const response = await api.delete(
    `/posts/${username}/${post_id}/dislike`,
    config,
  );

  return response.data as string[];
}
