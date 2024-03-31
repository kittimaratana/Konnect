import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';

const EventDetails = ({ location, date, description, action, actionText }) => {

    //format date to display
    const dateFormatted = new Date(date);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options);

    //alert to confirm request to attend
    const createAlert = () => {
        Alert.alert("Are you sure?", "Don't be that flakey friend", [
            {
                text: 'Cancel',
                onPress: () => { }
            },
            {
                text: 'Confirm',
                onPress: () => { action("Pending") },
            }
        ])
    }

    //event details UI and request to join button/alert
    return (
        <View style={styles.container}>
            <Text style={styles.detail}>Date: {formattedDate}</Text>
            <Text style={styles.detail}>Location: {location}</Text>
            <Text style={styles.detail}>Description: {description}</Text>
            <TouchableOpacity style={styles.button} onPress={createAlert}>
                <Text style={styles.buttonText}>{actionText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.margin,
        justifyContent: 'center'
    },
    detail: {
        marginBottom: spacing.gutter,
        fontSize: fontSize.bodyMedium
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonText: {
        color: colors.purpleButton,
        fontWeight: '500'
    }
});

export default EventDetails;