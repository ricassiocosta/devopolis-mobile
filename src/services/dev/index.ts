import api from '../api';

export const getDevInfo = async username => {
  const response = await api.get(`/devs/${username}`);
  return response.data;
};

export const follow = async username => {
  const response = await api.post(`/devs/${username}/follow`);
  return response.data;
};

export const unfollow = async username => {
  const response = await api.delete(`/devs/${username}/unfollow`);
  return response.data;
};
