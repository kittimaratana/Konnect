import { useState, useEffect, React } from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { colors, spacing, fontSize } from '../styles/styles';
import Header from '../components/Header';
import EventPreview from '../components/EventPreview';
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const [hostingEvents, setHostingEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [newNavigation, setNewNavigation] = useState(false);

    //fetch list of events user is hosting and list of events user status is going or pending
    const fetchEvents = async (event) => {
        try {
            const token = await AsyncStorage.getItem('token')
            const hostingEventsResponse = await axios.get("http://localhost:5001/events/user/hosting-events", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            const upcomingEventsResponse = await axios.get("http://localhost:5001/events/user/upcoming-events", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setHostingEvents(hostingEventsResponse.data);
            setUpcomingEvents(upcomingEventsResponse.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
        }
    }

    //with react applications, the screen is not reloaded when navigated to so to ensure data is reloading with new ones, we must check if the user just navigated to the screen and the screen is only refreshed once
    useEffect(() => {
        if (isFocused) {
            setNewNavigation(true);
        }
    }, [isFocused]);

    useEffect(() => {
        if (isFocused && newNavigation) {
            fetchEvents();
            setNewNavigation(false);
        }
    }, [isFocused, newNavigation]);

    //navigate to create new event
    const handleCreateEvent = () => {
        navigation.navigate('CreateEvent')
    }

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    //displays list of hosting, upcoming events and ability to create new event
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />
                <View style={styles.border} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Hosting Events</Text>
                </View>
                {hostingEvents.map((hostingEvent) => {
                    let hostStatus = "New Requests!";
                    if (hostingEvent.pendingStatus === "false") {
                        hostStatus = "View Event"
                    }
                    return (
                        <EventPreview
                            key={hostingEvent.id}
                            eventId={hostingEvent.id}
                            picture={hostingEvent.picture}
                            date={hostingEvent.date}
                            location={hostingEvent.location}
                            status={hostStatus}
                            guestType="Host"
                        />
                    );
                })}
                {hostingEvents.length === 0 && <Text style={styles.noEventsMessage}>No upcoming events that you are hosting</Text>}
                <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Upcoming Events</Text>
                </View>
                {upcomingEvents.map((upcomingEvent) => {
                    return (
                        <EventPreview
                            key={upcomingEvent.id}
                            eventId={upcomingEvent.id}
                            picture={upcomingEvent.picture}
                            date={upcomingEvent.date}
                            location={upcomingEvent.location}
                            maxGuests={upcomingEvent.max_guests}
                            description={upcomingEvent.description}
                            status={upcomingEvent.status}
                            guestType="Guest"
                        />
                    );
                })}
                {upcomingEvents.length === 0 && <Text style={styles.noEventsMessage}>Events will appear as you request to join</Text>}
            </ScrollView>
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
    titleContainer: {
        paddingBottom: spacing.component
    },
    title: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        color: colors.purpleButton,
        marginTop: spacing.component,
        fontWeight: '800'
    },
    noEventsMessage: {
        paddingHorizontal: spacing.margin,
        paddingBottom: spacing.component
    },
    settingOption: {
        paddingHorizontal: spacing.margin,
        marginTop: spacing.margin,
    },
    settingOptionText: {
        fontSize: fontSize.sectionHeader
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: spacing.margin,
        paddingBottom: spacing.component
    },
    buttonText: {
        color: colors.purpleButton,
        fontWeight: '500'
    }
});
export default HomeScreen;