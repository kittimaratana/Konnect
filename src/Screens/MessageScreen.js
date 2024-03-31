import React from 'react';
import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import Header from '../components/Header';
import { colors, spacing, fontSize } from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Future implementation using push notifications
//Placeholder UI design for now below
const MessageScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.border} />
            <Text style={styles.title}>Messages</Text>
            <View style={styles.messageContainer}>
                <MaterialCommunityIcons name="message" color={colors.gray} size='70'/>
                <Text style={styles.messageTitle}>No messages</Text>
                <Text style={styles.messageAlert}>Messages received and sent will appear here</Text>
            </View>
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
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginTop: spacing.component,
        fontWeight: '800'
    },
    messageContainer: {
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageTitle: {
        color: colors.black,
        fontWeight: '800',
        fontSize: fontSize.fields,
        paddingTop: spacing.gutter,
        paddingBottom: spacing.lineHeight*2
    },
    messageAlert: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.sectionHeader,
        color: colors.gray,
    }
});

export default MessageScreen;