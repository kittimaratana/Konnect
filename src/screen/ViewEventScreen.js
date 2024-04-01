import { useState, useEffect, React } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { colors, spacing, fontSize } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import UserImage from '../components/UserImage';
import AttendeeDetails from '../components/AttendeeDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//viewing specific event details
const ViewEventScreen = ({ route }) => {
    const navigation = useNavigation();
    const { eventId, guestType } = route.params;
    const [event, setEvent] = useState({});
    const [user, setUser] = useState({});
    const [attendanceList, setAttendanceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    //fetch event details, attendance details and user details
    const fetchEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            
            //fetch event details
            const eventResponse = await axios.get(`http://localhost:5001/events/${eventId}/details`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            //fetch list of attendee details
            const attendanceListResponse = await axios.get(`http://localhost:5001/events/${eventId}`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            //fetch current user details
            const userResponse = await axios.get(`http://localhost:5001/users`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setEvent(eventResponse.data);
            setAttendanceList(attendanceListResponse.data);
            setUser(userResponse.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
        }
    }

    //status changed to cancelled, rejected or going based on host or guest action
    const putAttendance = async (userId, attendanceId, status) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put(`http://localhost:5001/events/${eventId}`, {
                attendance_id: attendanceId,
                event_id: eventId,
                status: status,
                user_id: userId
            }, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setIsLoading(false);

            if (status === "Cancelled") {
                navigation.navigate('HomeScreen');
            }

            fetchEvent();
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
        }
    }

    useEffect(() => {
        fetchEvent();
    }, []);

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    //if guest is viewing event, they will only see users going
    //if host is viewing event, they will see users going and pending but not others (cancelled/uninterested)
    const hostDetails = attendanceList.find(attendee => attendee["id"] === event["user_id"]);
    const userPendingDetails = attendanceList.find(attendee => attendee["id"] === user["id"] && attendee["status"] === "Pending");
    const guestGoingDetails = attendanceList.filter(attendee => attendee["id"] !== event["user_id"] && attendee["status"] === "Going");
    const guestPendingDetails = attendanceList.filter(attendee => attendee["id"] !== event["user_id"] && attendee["status"] === "Pending");

    //format date to show to users
    const dateFormatted = new Date(event.date);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options);

    //based on whether we are on host or guest event, different list of users and access types are shown on the UI (i.e., accept to join event is only shown to host)
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" color={colors.gray} size={25} />
            </TouchableOpacity>
            <ScrollView>
                <Header />
                <Text style={styles.title}>{event.location}</Text>
                <UserImage picture={hostDetails.picture} userId={hostDetails.id} width='100%' height={350} />
                <Text style={styles.details}>📆 Event Date: {formattedDate}</Text>
                <Text style={[styles.details, styles.description]}>Description: {event.description}</Text>
                <View style={styles.subTitleBorder}>
                    <Text style={styles.subTitle}>Guest List</Text>
                </View>
                {hostDetails &&
                    <AttendeeDetails
                        eventId={eventId}
                        guestType={guestType}
                        status={hostDetails.status}
                        userId={hostDetails.id}
                        attendanceId={hostDetails["attendence_id"]}
                        firstName={hostDetails.first_name}
                        lastName={hostDetails.last_name}
                        picture={hostDetails.picture}
                        putAttendance={putAttendance}
                    />
                }
                {guestGoingDetails && guestGoingDetails.map((details, index) => (
                    <AttendeeDetails
                        key={index}
                        eventId={eventId}
                        guestType={guestType}
                        status={details.status}
                        userId={details.id}
                        attendanceId={details["attendence_id"]}
                        firstName={details.first_name}
                        lastName={details.last_name}
                        picture={details.picture}
                        putAttendance={putAttendance}
                    />
                ))}
                {guestPendingDetails && guestType === "Host" && guestPendingDetails.map((details, index) => (
                    <AttendeeDetails
                        key={index}
                        eventId={eventId}
                        guestType={guestType}
                        status={details.status}
                        userId={details.id}
                        attendanceId={details["attendence_id"]}
                        firstName={details.first_name}
                        lastName={details.last_name}
                        picture={details.picture}
                        putAttendance={putAttendance}
                    />
                ))}
                {userPendingDetails &&
                    <AttendeeDetails
                        eventId={eventId}
                        guestType={guestType}
                        status={userPendingDetails.status}
                        userId={userPendingDetails.id}
                        attendanceId={userPendingDetails["attendence_id"]}
                        firstName={userPendingDetails.first_name}
                        lastName={userPendingDetails.last_name}
                        picture={userPendingDetails.picture}
                        putAttendance={putAttendance}
                    />
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    goBackContainer: {
        position: 'absolute',
        top: 35,
        zIndex: 1000
    },
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginBottom: spacing.margin,
        fontWeight: '500'
    },
    details: {
        fontSize: fontSize.sectionHeader,
        paddingHorizontal: spacing.margin,
        paddingTop: spacing.component
    },
    description: {
        paddingBottom: spacing.component,
    },
    subTitleBorder: {
        paddingTop: spacing.component,
        borderTopWidth: 1,
        borderTopColor: colors.borderLightPurple,
    },
    subTitle: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginBottom: spacing.component
    },
});

export default ViewEventScreen;