import React from 'react';
import { TouchableHighlight, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { colors, spacing, fontSize } from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
    const navigation = useNavigation();

    //logout of page: future interaction have proper logout process
    const handleLogout = () => {
        navigation.navigate('Intro')
    }

    //view profile for main user
    const handleViewProfile = () => {
        navigation.navigate('ViewProfile', { userId: "" })
    }

    //UI where users have the ability to view profile or logout
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.border} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Settings</Text>
            </View>
            <TouchableHighlight style={styles.settingOption} activeOpacity={0.6} underlayColor={colors.borderLightPurple} onPress={handleViewProfile}>
                <View style={styles.settingOptionWrapper}>
                    <View style={styles.settingsLeftOptionWrapper}>
                        <MaterialCommunityIcons name="account-heart-outline" color={colors.gray} size='25' />
                        <Text style={styles.settingOptionText}>View Profile</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" color={colors.gray} size='25' />
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.settingOption} activeOpacity={0.6} underlayColor={colors.borderLightPurple} onPress={handleLogout}>
                <View style={styles.settingOptionWrapper}>
                    <View style={styles.settingsLeftOptionWrapper}>
                        <MaterialCommunityIcons name="logout" color={colors.gray} size='25' />
                        <Text style={styles.settingOptionText}>Logout</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" color={colors.gray} size='25' />
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    border: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.borderLightPurple
    },
    titleContainer: {
        paddingBottom: spacing.component,
        marginBottom: spacing.component
    },
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginTop: spacing.component,
        fontWeight: '800'
    },
    settingOption: {
        paddingHorizontal: spacing.margin,
        paddingVertical: spacing.component
    },
    settingOptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    settingsLeftOptionWrapper: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingOptionText: {
        paddingLeft: spacing.component,
        fontSize: fontSize.sectionHeader,
        fontWeight: '500',
        color: colors.gray
    }
});

export default SettingsScreen;