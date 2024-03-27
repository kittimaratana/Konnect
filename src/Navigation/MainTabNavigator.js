import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import ExploreScreen from '../screens/ExploreScreen'
import MessageScreen from '../screens/MessageScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainTabNavigator = () => {
    const MainTab = createBottomTabNavigator();

    return (
      <MainTab.Navigator>
        <MainTab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
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
          }}
        />
        <MainTab.Screen 
          name="Message" 
          component={MessageScreen} 
          options={{
            //tabBarLabel: 'Message',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={size} />
            )
          }}
          />
        <MainTab.Screen 
          name="Setting" 
          component={SettingsScreen} 
          options={{
            //tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            )
          }}
        />
      </MainTab.Navigator>
    )
  }

export default MainTabNavigator;