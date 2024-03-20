import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

//import the different screens
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterUserScreen from './src/Screens/RegisterUserScreen';
import RegisterDetailsScreen from './src/Screens/RegisterDetailsScreen';


import HomeScreen from './src/Screens/HomeScreen';
import ExploreScreen from './src/Screens/ExploreScreen';
import MessageScreen from './src/Screens/MessageScreen';
import SettingScreen from './src/Screens/SettingsScreen';

const MainTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Main() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Explore" component={ExploreScreen} />
      <MainTab.Screen name="Message" component={MessageScreen} />
      <MainTab.Screen name="Setting" component={SettingScreen} />
    </MainTab.Navigator>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          initialParams={{ handleLogin: handleLogin }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegisterUser" 
          component={RegisterUserScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegisterDetails" 
          component={RegisterDetailsScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>


  );
}
