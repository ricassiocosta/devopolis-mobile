import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../pages/Login';
import NavigationTabs from './NavigationTabs';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name='Login' component={LoginPage} />
      <App.Screen name='NavigationTabs' component={NavigationTabs} />
      <App.Screen name='Profile' component={Profile} />
    </App.Navigator>
  </>
);

export default AppRoutes;
