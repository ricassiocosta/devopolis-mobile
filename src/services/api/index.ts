import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

async function getConfig() {
  const token = await AsyncStorage.getItem('TOKEN');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}

export { api, getConfig };
