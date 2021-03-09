import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import Routes from './routes';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <View style={{ backgroundColor: '#fcfdfe', flex: 1 }}>
          <StatusBar backgroundColor='#008cff' />
          <Routes />
        </View>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
