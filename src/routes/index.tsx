import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../pages/Login';
import Feed from '../pages/Feed';

const Login = createStackNavigator();

const LoginRoute: React.FC = () => (
  <Login.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Login.Screen name='Login' component={LoginPage} />
    <Login.Screen name='Feed' component={Feed} />
  </Login.Navigator>
);

export default LoginRoute;
