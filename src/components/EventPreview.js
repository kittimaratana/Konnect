import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const EventPreview = ({ eventId, picture, date, location, status, guestType }) => {
    const dateFormatted = new Date(date);
    const navigation = useNavigation();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options)

    const handleViewEvent = () => {
        navigation.navigate('ViewEvent', {eventId, guestType});
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: `http://localhost:5001${picture}` }}
                />
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailHeader} >
                    <Text style={styles.detail}>{status}</Text>
                    <Text style={styles.detail}>Date: {formattedDate}</Text>
                </View>
                <Text style={styles.detail}>Location: {location}</Text>
                <TouchableOpacity style={styles.button} onPress={handleViewEvent}>
                    <Text style={styles.buttonText}>⏩️</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.margin,
        paddingVertical: spacing.component,
        flexDirection: 'row',
        width: '100%',
    },
    imageContainer: {
        width: '20%',
    },
    detailContainer: {
        width: '80%',
    },
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default EventPreview;