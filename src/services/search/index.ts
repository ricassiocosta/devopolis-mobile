import { IDevInfo } from '../../interfaces/IDevInfo';
import api from '../api';

export const search = async (searchQuery: string): Promise<IDevInfo[]> => {
  const response = await api.get('/search', {
    params: { search_query: searchQuery },
  });
  return response.data.devs as IDevInfo[];
};
