import axios from 'axios';
import { store } from '../../store';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async config => {
  const state = store.getState();
  const { token } = state.root;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
