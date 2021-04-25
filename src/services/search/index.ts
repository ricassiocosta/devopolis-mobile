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

export const search = async (searchQuery: string): Promise<DevInfo[]> => {
  const response = await api.get('/search', {
    params: { search_query: searchQuery },
  });
  return response.data.devs as DevInfo[];
};
