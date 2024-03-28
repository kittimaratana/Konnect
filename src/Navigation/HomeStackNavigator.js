import React from 'react';
import HomeScreen from '../screens/HomeScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import { createStackNavigator } from '@react-navigation/stack';

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator;