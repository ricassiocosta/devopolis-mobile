import api from '../api';

interface Post {
  _id: string;
  author: string;
  thumbnail: string;
  title: string;
  post: string;
}

let posts: Post[];
export async function getPosts(username: string): Promise<Post[]> {
  try {
    const response = await api.get(`/posts/${username}`);
    posts = response.data as Post[];
    return posts;
  } catch (err) {
    return posts;
  }
}

let post: Post;
export async function getPost(username: string, postId: string): Promise<Post> {
  try {
    const response = await api.get(`/posts/${username}/${postId}`);
    post = response.data as Post;
    return post;
  } catch (error) {
    return post;
  }
}

export const createPost = async (
  content: string,
  thumbnail: string,
): Promise<Post> => {
  const response = await api.post('/posts/', {
    post: content,
    thumbnail,
  });
  return response.data;
};
