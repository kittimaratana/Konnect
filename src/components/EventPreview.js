import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { colors, spacing } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EventPreview = ({ eventId, picture, date, location, status, guestType }) => {
    const navigation = useNavigation();

    //convert date to display to user
    const dateFormatted = new Date(date);
    const options = {
        month: "short",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options)

    //allows user to navigate to view event
    const handleViewEvent = () => {
        navigation.navigate('ViewEvent', { eventId, guestType });
    }

    const formatLocation = (location) => {
        let locationTrim = location.trim();
        if(locationTrim .length > 32) {
            return(locationTrim.substring(0,28) + "...")
        }
        return(locationTrim);
    }

    //displays each event detail with ability to navigate to see more comprehensive details
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={colors.borderLightPurple} onPress={handleViewEvent}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `http://localhost:5001${picture}` }}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailRowContainer} >
                        <Text style={[styles.detail, styles.location]}>{formatLocation(location)}</Text>
                        <Text style={[styles.detail, styles.date]}>{formattedDate}</Text>
                    </View>
                    <View style={styles.statusContainer} >
                        <Text style={[styles.detail, styles.status]}>{status}</Text>
                        <MaterialCommunityIcons name="chevron-right" color={colors.gray} size={25}/>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
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
        height: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden'
    },
    detailContainer: {
        width: '80%',
        height: 50,
        justifyContent: 'space-between',
    },
    detailRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    location: {
        fontWeight: '500'
    },
    date: {
        color: colors.gray
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    status: {
        color: colors.gray
    }
});

export default EventPreview;