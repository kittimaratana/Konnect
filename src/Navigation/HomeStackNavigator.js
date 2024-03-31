import React from 'react';
import HomeScreen from '../screens/HomeScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import ViewEventScreen from '../screens/ViewEventScreen'
import ViewProfileScreen from '../screens/ViewProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ViewEvent" component={ViewEventScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ViewOtherProfile" component={ViewProfileScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator;