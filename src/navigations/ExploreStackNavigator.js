import React from 'react';
import ExploreScreen from '../screen/ExploreScreen'
import ViewProfileScreen from '../screen/ViewProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';

//stack for explore tab
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