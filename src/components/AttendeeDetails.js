import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AttendeeDetails = ({ guestType, status, userId, attendanceId, firstName, lastName, picture, putAttendance }) => {
    const navigation = useNavigation();
    const cancelGuestRequest = () => {
        Alert.alert("Cancel your request to join?", "This action can't be undone", [
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
        Alert.alert("Confirmation required", `Reject ${firstName}'s request?`, [
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
        Alert.alert(`Accept ${firstName}'s request?`, "This action can't be undone", [
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
        navigation.navigate('ViewOtherProfile', { userId })
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: `http://localhost:5001${picture}` }}
                />
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailRowContainer} >
                    <Text style={[styles.detail, styles.name]}>{firstName} {lastName}</Text>
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
                        {status === "Hosting" &&
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Host</Text>
                            </View>
                        }
                    </View>
                </View>
                <TouchableOpacity style={styles.viewProfileContainer} onPress={handleViewProfile}>
                    <Text style={[styles.detail, styles.viewProfile]}>View Profile</Text>
                    <MaterialCommunityIcons name="chevron-right" color={colors.gray} size={25} />
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
        width: '100%'
    },
    imageContainer: {
        width: '20%',
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
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: '500'
    },
    viewProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewProfile: {
        color: colors.gray
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
    }
});

export default AttendeeDetails;