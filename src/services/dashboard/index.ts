import { IPost } from '../../interfaces/IPost';
import { api, getConfig } from '../api';

export const getDashboard = async (): Promise<IPost[]> => {
  const config = await getConfig();
  const response = await api.get('/dashboard', config);
  return response.data.posts as IPost[];
};
