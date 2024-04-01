import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ActionButton from '../components/ActionButton';
import {colors, spacing, fontSize} from '../styles/styles';

//intro screen with ability to navigate to login or new account screen
const IntroScreen = () => {
    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    const navigateToRegister = () => {
        navigation.navigate('Register')
    }

    //UI for Intro page and customized button styling from ActionButton component
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Konnect</Text>
                <Text style={styles.emojis}>👉    🏈    ♓    🎶    🎭    🌸</Text>
            </View>
            <View style={styles.actionContainer}>
                <ActionButton onPress={navigateToLogin} title="Login" textColor={colors.white}/>
                <ActionButton style={styles.registerButton} onPress={navigateToRegister} title="New Account" />
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
        fontSize: fontSize.nameIntro
    },
    emojis: {
        marginTop: spacing.component
    },
    actionContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.margin,
    },
    registerButton: {
        marginTop: spacing.component,
        backgroundColor: colors.lightPurple
    }
});

export default IntroScreen;