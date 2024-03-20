import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const LoginScreen = ({route}) => {
    const { handleLogin } = route.params;

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    }
    
    const handleLogins = () => {
        handleLogin();
        navigation.navigate('Main')
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleBack}>
                <Text>Back</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleLogins}>
                <Text>Login</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LoginScreen;