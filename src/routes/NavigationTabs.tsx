import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image } from 'react-native';
import HomeImg from '../assets/home_unfocused.png';
import NewPostImg from '../assets/new_post_unfocused.png';
import ChatImg from '../assets/chat_unfocused.png';

import FocusedHomeImg from '../assets/home_focused.png';
import FocusedNewPostImg from '../assets/new_post_focused.png';
import FocusedChatImg from '../assets/chat_focused.png';

import Home from '../pages/Feed';
import NewPost from '../pages/NewPost';
import Chat from '../pages/Chat';

const { Navigator, Screen } = createBottomTabNavigator();

const NavigationTabs: React.FC = () => (
  <Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        elevation: 0,
        shadowOpacity: 0,
        height: 48,
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconStyle: {
        flex: 0,
        width: 32,
        height: 27,
      },
      inactiveBackgroundColor: '#fff',
      activeBackgroundColor: '#fff',
      keyboardHidesTabBar: true,
    }}
    initialRouteName='Home'
  >
    <Screen
      name='NewPost'
      component={NewPost}
      options={{
        tabBarIcon: ({ focused }) => {
          return <Image source={focused ? FocusedNewPostImg : NewPostImg} />;
        },
      }}
    />
    <Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          return <Image source={focused ? FocusedHomeImg : HomeImg} />;
        },
      }}
    />
    <Screen
      name='Chat'
      component={Chat}
      options={{
        tabBarIcon: ({ focused }) => {
          return <Image source={focused ? FocusedChatImg : ChatImg} />;
        },
      }}
    />
  </Navigator>
);

export default NavigationTabs;
