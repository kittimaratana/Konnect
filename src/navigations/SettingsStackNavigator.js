import React from 'react';
import SettingsScreen from '../screen/SettingsScreen'
import ViewProfileScreen from '../screen/ViewProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';

//stack for settings tab
const SettingsStackNavigator = () => {
  const SettingsStack = createStackNavigator();

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <SettingsStack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNavigator;