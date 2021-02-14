import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../pages/About';

const Stack = createStackNavigator();

const AboutNativation: React.FC = () => (
  <Stack.Navigator>

    <Stack.Screen
      name="About"
      component={About}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default AboutNativation;
