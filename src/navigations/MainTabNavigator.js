import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator'
import ExploreStackNavigator from './ExploreStackNavigator'
import MessageScreen from '../screen/MessageScreen'
import SettingsStackNavigator from './SettingsStackNavigator'
import { MaterialCommunityIcons } from '@expo/vector-icons';

//4 tabs shown once user is logged in, which includes home, explore, messages and settings
const MainTabNavigator = () => {
    const MainTab = createBottomTabNavigator();

    return (
      <MainTab.Navigator>
        <MainTab.Screen 
          name="Home" 
          component={HomeStackNavigator} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false 
          }}
        />
        <MainTab.Screen 
          name="Explore" 
          component={ExploreStackNavigator} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
            headerShown: false 
          }}
        />
        <MainTab.Screen 
          name="Message" 
          component={MessageScreen} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={size} />
            ),
            headerShown: false 
          }}
          />
        <MainTab.Screen 
          name="SettingTab" 
          component={SettingsStackNavigator} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            ),
            headerShown: false 
          }}
        />
      </MainTab.Navigator>
    )
  }

export default MainTabNavigator;