import { IDevInfo } from '../../interfaces/IDevInfo';
import { api, getConfig } from '../api';

export const search = async (searchQuery: string): Promise<IDevInfo[]> => {
  const config = await getConfig();
  const response = await api.get(`/search?search_query=${searchQuery}`, config);
  return response.data.devs as IDevInfo[];
};
