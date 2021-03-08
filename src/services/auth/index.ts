import api from '../api';

interface Response {
  token: string;
  username: string;
}

export const authenticate = async (githubToken: string): Promise<Response> => {
  const response = await api.post('/auth', { github_token: githubToken });
  return response.data;
};
