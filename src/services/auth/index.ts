import { api, getConfig } from '../api';

interface Response {
  token: string;
  username: string;
}

export const authenticate = async (githubToken: string): Promise<Response> => {
  const response = await api.post('/auth', { github_token: githubToken });
  return response.data;
};

export const tokenIsValid = async (): Promise<boolean> => {
  const config = await getConfig();
  const response = await api.get('/validate_token', config);
  if (response.status !== 200) {
    return false;
  }

  return true;
};
