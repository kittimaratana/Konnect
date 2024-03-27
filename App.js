import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterProfileScreen from './src/screens/RegisterProfileScreen';

export default function App() {
  const Stack = createStackNavigator();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={IntroScreen} initialParams={{ handleLogin: handleLogin }} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterProfile" component={RegisterProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
