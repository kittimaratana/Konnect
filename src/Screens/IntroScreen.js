import React from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ActionButton from '../components/ActionButton';

const IntroScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login', { handleLogin: handleLogin })
    }

    const navigateToRegister = () => {
        navigation.navigate('Register', { handleLogin: handleLogin })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Konnect</Text>
            <Text>👉 🏈 ♓ 🎶 🎭 🌸</Text>
            <View style={styles.actionContainer}>
                <ActionButton onPress={navigateToLogin} title="Login" />
                <ActionButton style={styles.actionGap} onPress={navigateToRegister} title="Register" />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3cef6',
    },
    actionContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 100,
    },
    actionGap: {
        marginTop: 10,
        backgroundColor: '#e3cef6',
    }

});

export default IntroScreen;