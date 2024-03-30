import { useState, useEffect, React } from "react";
import { ScrollView, View, Text, RefreshControl, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { colors, spacing, fontSize, form } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import UserImage from '../components/UserImage';
import AttendeeDetails from '../components/AttendeeDetails';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';

const ViewEventScreen = ({ route }) => {
    const navigation = useNavigation();
    const { eventId, guestType } = route.params;
    const [event, setEvent] = useState({});
    const [user, setUser] = useState({});
    const [attendanceList, setAttendanceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const eventResponse = await axios.get(`http://localhost:5001/events/${eventId}/details`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            const attendanceListResponse = await axios.get(`http://localhost:5001/events/${eventId}`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

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
            console.log(error.response.data);
            console.log("tester");
            setIsLoading(false);
            setHasError(true);
        }
    }

    //status either Uninterested or Pending
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

            if(status === "Cancelled") {
                navigation.navigate('Home');
            } 

            await fetchEvent();
        } catch (error) {
            console.log(error.response.data);
            setIsLoading(false);
            setHasError(true);
        }
    }

    useEffect(() => {
        // Fetching events for user
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
    const dateFormatted = new Date(event.date);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    let formattedDate = dateFormatted.toLocaleString("en-US", options);
    //console.log(guestPendingDetails[0]["attendence_id"]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />
                <Text style={styles.title}>{event.location}</Text>
                <UserImage picture={hostDetails.picture} userId={hostDetails.id} width='100%' height={400} />
                <Text style={styles.details}>Date: {formattedDate}</Text>
                <Text style={styles.details}>Description: {event.description}</Text>
                <Text style={styles.subTitle}>Guest List</Text>
                {guestGoingDetails && guestGoingDetails.map((details, index) => (
                    <AttendeeDetails
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
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginBottom: spacing.margin,
    },
    details: {
        fontSize: fontSize.sectionHeader,
        paddingHorizontal: spacing.margin,
        paddingTop: spacing.component
    },
    subTitle: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginVertical: spacing.component
    },
});

export default ViewEventScreen;