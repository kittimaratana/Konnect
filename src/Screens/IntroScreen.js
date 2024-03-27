import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ActionButton from '../components/ActionButton';
import {colors, spacing, fontSize} from '../styles/styles';

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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Konnect</Text>
                <Text>👉 🏈 ♓ 🎶 🎭 🌸</Text>
            </View>
            <View style={styles.actionContainer}>
                <ActionButton onPress={navigateToLogin} title="Login"/>
                <ActionButton style={styles.actionGap} onPress={navigateToRegister} title="Register" />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%'
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    actionContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.margin,

    },
    actionGap: {
        marginTop: spacing.component,
        backgroundColor: '#e3cef6'
    }

});

export default IntroScreen;