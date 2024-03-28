import { useState, useEffect, React } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { colors, spacing, fontSize, form } from '../styles/styles';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import EventPreview from '../components/EventPreview';
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
    const [hostingEvents, setHostingEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [change, setChange] = useState(0);
    const navigation = useNavigation();

    const fetchEvents = async (event) => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
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
            console.log(error.response.data);
            setIsLoading(false);
            setHasError(true);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, [change]);

    const handleCreateEvent = () => {
        navigation.navigate('CreateEvent')
    }

    /*
    const handleChanges = () => {
        setChange(change+1)
    }
    */

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }
    console.log(hostingEvents);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />
                <Text style={styles.title}>Events I'm Hosting</Text>
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
                            maxGuests={hostingEvent.max_guests}
                            description={hostingEvent.description}
                            status={hostStatus}
                        />
                    );
                })}
                <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Upcoming Events</Text>
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
                        />
                    );
                })}
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
        marginBottom: spacing.margin
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
    },
    buttonText: {
        color: colors.purpleButton
    }
});
export default HomeScreen;