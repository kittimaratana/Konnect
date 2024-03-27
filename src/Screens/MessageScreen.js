import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import { colors, spacing, fontSize} from '../styles/styles';

//FUTURE IMPLEMENTATION (ADDED MINOR STYLING)
const MessageScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <Text style={styles.messageAlert}>✨ No messages currently ✨</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
        alignItems: 'center',
    },
    messageAlert: {
        paddingHorizontal: spacing.margin,
        marginTop: spacing.component,
        fontSize: fontSize.sectionHeader,
        color: colors.gray
    }
});

export default MessageScreen;