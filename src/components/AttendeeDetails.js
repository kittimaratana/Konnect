import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const AttendeeDetails = ({ eventId, guestType, status, userId, attendanceId, firstName, lastName, picture, putAttendance }) => {
    const navigation = useNavigation();
    //console.log(attendanceId);
    const cancelGuestRequest = () => {
        Alert.alert("Cancel Attendance Request?", "They will be removed from your list", [
            {
                text: 'Go back',
                onPress: () => { }
            },
            {
                text: 'Cancel Request',
                onPress: () => { putAttendance(userId, attendanceId, "Cancelled") },
            }
        ])
    }

    const rejectGuestRequest = () => {
        Alert.alert("Confirm Required", "Are you sure you want to decline this invitation", [
            {
                text: 'Cancel',
                onPress: () => { }
            },
            {
                text: 'Confirm',
                onPress: () => { putAttendance(userId, attendanceId, "Rejected") },
            }
        ])
    }

    const acceptGuestRequest = () => {
        Alert.alert("Accept request to join?", "You won't be able to undo this action", [
            {
                text: 'Cancel',
                onPress: () => { }
            },
            {
                text: 'Confirm',
                onPress: () => {
                    putAttendance(userId, attendanceId, "Going")
                },
            }
        ])
    }

    const handleViewProfile = () => {
        navigation.navigate('ViewOtherProfile', {userId})
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageContainer} onPress={handleViewProfile}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: `http://localhost:5001${picture}` }}
                />
            </TouchableOpacity>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>{firstName} {lastName}</Text>
                <View style={styles.actionContainer}>
                    {guestType === "Guest" && status === "Pending" &&
                        <TouchableOpacity style={styles.button} onPress={cancelGuestRequest}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    }
                    {guestType === "Host" && status === "Pending" &&
                        <TouchableOpacity style={styles.button} onPress={rejectGuestRequest}>
                            <Text style={styles.buttonText}>❌</Text>
                        </TouchableOpacity>
                    }
                    {guestType === "Host" && status === "Pending" &&
                        <TouchableOpacity style={styles.button} onPress={acceptGuestRequest}>
                            <Text style={styles.buttonText}>✅</Text>
                        </TouchableOpacity>
                    }
                    {status === "Going" &&
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Going</Text>
                        </View>
                    }
                </View>
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
        borderTopWidth: 1,
        borderTopColor: colors.lightPurple
    },
    imageContainer: {
        width: '20%',
    },
    detailContainer: {
        width: '80%',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-between'
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
        paddingLeft: spacing.gutter
    },
    buttonText: {
        color: colors.purpleButton
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
});

export default AttendeeDetails;