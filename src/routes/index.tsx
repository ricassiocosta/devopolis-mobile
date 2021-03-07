import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../pages/Login';

const Login = createStackNavigator();

const LoginRoute: React.FC = () => (
  <Login.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Login.Screen name='Login' component={LoginPage} />
  </Login.Navigator>
);

export default LoginRoute;
