import React from 'react';
import SettingsScreen from '../screens/SettingsScreen'
import ViewProfileScreen from '../screens/ViewProfileScreen'
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