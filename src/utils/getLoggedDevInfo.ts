import AsyncStorage from '@react-native-community/async-storage';
import { IDevInfo } from '../interfaces/IDevInfo';

export default async function getLoggedDevInfo(): Promise<IDevInfo> {
  const loggedDevString = await AsyncStorage.getItem('LOGGED_DEV');
  if (!loggedDevString) {
    throw new Error('no dev is logged');
  }

  const loggedDev = JSON.parse(loggedDevString) as IDevInfo;

  return loggedDev;
}
