import React from 'react';
import ExploreScreen from '../screens/ExploreScreen'
import ViewProfileScreen from '../screens/ViewProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';

const ExploreStackNavigator = () => {
  const ExploreStack = createStackNavigator();

  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
      <ExploreStack.Screen name="ViewOtherProfile" component={ViewProfileScreen} options={{ headerShown: false }} />
    </ExploreStack.Navigator>
  )
}

export default ExploreStackNavigator;