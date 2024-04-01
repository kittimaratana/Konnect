import React from 'react';
import HomeScreen from '../screen/HomeScreen'
import CreateEventScreen from '../screen/CreateEventScreen'
import ViewEventScreen from '../screen/ViewEventScreen'
import ViewProfileScreen from '../screen/ViewProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';

//stack for home tab
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