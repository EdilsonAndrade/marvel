import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutNavigation from './aboutNavigation';
import Search from '../pages/Search';
import ComicsList from '../pages/ComicsList';
import StoreMap from '../pages/StoreMap';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator
    initialRouteName="AboutNavigation"
  >

    <Stack.Screen
      name="AboutNavigation"
      component={AboutNavigation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Comic"
      component={ComicsList}
      options={{ header: () => <Search /> }}
    />
    <Stack.Screen
      name="StoreMap"
      component={StoreMap}
      options={{ header: () => <Search /> }}
    />

  </Stack.Navigator>
);

export default Routes;
