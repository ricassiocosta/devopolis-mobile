import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LoginPage from '../pages/Login';
import NavigationTabs from './NavigationTabs';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import { getDevInfo } from '../services/dev';
import { setDevInfo } from '../store/actions/dev';

const App = createStackNavigator();

const Gateway: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('TOKEN');
      const username = await AsyncStorage.getItem('USERNAME');
      if (token && username) {
        getDevInfo(username)
          .then(devInfo => {
            if (devInfo) {
              dispatch(setDevInfo(devInfo));
              navigation.navigate('NavigationTabs');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        navigation.navigate('Login');
      }
    }

    getTokenFromStorage();
  }, [dispatch, navigation]);

  return <></>;
};

const AppRoutes: React.FC = () => (
  <>
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name='Gateway' component={Gateway} />
      <App.Screen name='Login' component={LoginPage} />
      <App.Screen name='NavigationTabs' component={NavigationTabs} />
      <App.Screen name='Profile' component={Profile} />
      <App.Screen name='Search' component={Search} />
    </App.Navigator>
  </>
);

export default AppRoutes;
