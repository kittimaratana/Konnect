import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator'
import ExploreScreen from '../screens/ExploreScreen'
import MessageScreen from '../screens/MessageScreen'
import SettingsStackNavigator from './SettingsStackNavigator'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainTabNavigator = () => {
    const MainTab = createBottomTabNavigator();

    return (
      <MainTab.Navigator>
        <MainTab.Screen 
          name="Home" 
          component={HomeStackNavigator} 
          options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false 
          }}
        />
        <MainTab.Screen 
          name="Explore" 
          component={ExploreScreen} 
          options={{
            //tabBarLabel: 'Magnify',
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
            //tabBarLabel: 'Message',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={size} />
            ),
            headerShown: false 
          }}
          />
        <MainTab.Screen 
          name="Setting" 
          component={SettingsStackNavigator} 
          options={{
            //tabBarLabel: 'Account',
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