import { IPost } from '../../interfaces/IPost';
import { api, getConfig } from '../api';

let posts: IPost[];
export async function getPosts(username: string): Promise<IPost[]> {
  try {
    const config = await getConfig();
    const response = await api.get(`/posts/${username}`, config);
    posts = response.data as IPost[];
    return posts;
  } catch (err) {
    return posts;
  }
}

let post: IPost;
export async function getPost(
  username: string,
  postId: string,
): Promise<IPost> {
  try {
    const config = await getConfig();
    const response = await api.get(`/posts/${username}/${postId}`, config);
    post = response.data as IPost;
    return post;
  } catch (error) {
    return post;
  }
}

export const createPost = async (
  content: string,
  thumbnail: string,
): Promise<IPost> => {
  const config = await getConfig();
  const response = await api.post(
    '/posts/',
    {
      post: content,
      thumbnail,
    },
    config,
  );
  return response.data;
};
