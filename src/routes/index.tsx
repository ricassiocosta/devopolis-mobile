import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import LoginPage from '../pages/Login';
import { NavigationTabs, ProfileTabs } from './NavigationTabs';
import Search from '../pages/Search';
import { tokenIsValid } from '../services/auth';

const App = createStackNavigator();

const Gateway: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('TOKEN');

      if (token) {
        tokenIsValid()
          .then(() => {
            navigation.navigate('NavigationTabs');
          })
          .catch(err => {
            navigation.navigate('Login');
            throw new Error(err);
          });
      } else {
        navigation.navigate('Login');
      }
    }

    getTokenFromStorage();
  }, [navigation]);

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
      <App.Screen name='Profile' component={ProfileTabs} />
      <App.Screen name='Search' component={Search} />
    </App.Navigator>
  </>
);

export default AppRoutes;
