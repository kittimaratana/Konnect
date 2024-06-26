import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './src/navigations/MainTabNavigator';
import IntroScreen from './src/screen/IntroScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import RegisterProfileScreen from './src/screen/RegisterProfileScreen';

export default function App() {
  const Stack = createStackNavigator();

  //future implementation: set up proper authentication method between screens using token on front-end (currently works better for backend)
  //current shows stack between login process and main tab
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterProfile" component={RegisterProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
