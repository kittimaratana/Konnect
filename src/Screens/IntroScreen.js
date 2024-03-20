import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const IntroScreen = ({route}) => {
    const { handleLogin } = route.params;
    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login', {handleLogin: handleLogin})
    }

    const navigateToRegister = () => {
        navigation.navigate('RegisterUser', {handleLogin: handleLogin})
    }

    return (
        <View style={styles.container}>
            <Text>Setting Screen:</Text>
            <TouchableWithoutFeedback onPress={navigateToLogin}>
                <Text>Login</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={navigateToRegister}>
                <Text>Register</Text>
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

export default IntroScreen;