import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';
import ActionButton from './ActionButton';

const UserImage = ({ location, date, description, action, actionText }) => {
    const dateFormatted = new Date(date);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options)

    return (
        <View style={styles.container}>
            <Text style={styles.detail}>Date: {formattedDate}</Text>
            <Text style={styles.detail}>Location: {location}</Text>
            <Text style={styles.detail}>Description: {description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => action("Pending")}>
                <Text style={styles.buttonText}>{actionText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: spacing.margin,
        justifyContent: 'center'
    },
    detail: {
        marginBottom: spacing.gutter
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonText: {
        color: colors.purpleButton
    }
});

export default UserImage;