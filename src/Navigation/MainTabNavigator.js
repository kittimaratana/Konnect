import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen'
import ExploreScreen from '../Screens/ExploreScreen'
import MessageScreen from '../Screens/MessageScreen'
import SettingsScreen from '../Screens/SettingsScreen'

const MainTabNavigator = () => {
    const MainTab = createBottomTabNavigator();

    return (
      <MainTab.Navigator>
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Explore" component={ExploreScreen} />
        <MainTab.Screen name="Message" component={MessageScreen} />
        <MainTab.Screen name="Setting" component={SettingsScreen} />
      </MainTab.Navigator>
    )
  }

export default MainTabNavigator;