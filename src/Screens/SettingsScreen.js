import React from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { colors, spacing, fontSize } from '../styles/styles';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Intro')
    }

    const handleViewProfile = () => {
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity style={styles.settingOption} onPress={handleViewProfile}>
                <Text style={styles.settingOptionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOption} onPress={handleLogout}>
                <Text style={styles.settingOptionText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: colors.white,
        backgroundColor: colors.lightPurple,
        alignItems: 'flex-start',
    },
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginBottom: spacing.margin
    },
    settingOption: {
        paddingHorizontal: spacing.margin,
        marginTop: spacing.margin,
    },
    settingOptionText: {
        fontSize: fontSize.sectionHeader
    }
});

export default SettingsScreen;