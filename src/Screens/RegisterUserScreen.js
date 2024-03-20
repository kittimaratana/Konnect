import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const RegisterUserScreen = ({route}) => {
    const { handleLogin } = route.params;

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    }
    
    const handleRegister = () => {
        handleLogin();
        navigation.navigate('Main')
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleBack}>
                <Text>Back</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleRegister}>
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

export default RegisterUserScreen;