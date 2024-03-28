import { useState, useEffect, React } from "react";
import { View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

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
            <Text>Events I'm Hosting</Text>
            {hostingEvents.map((hostingEvent) => {
                return (
                    <View key={hostingEvent.id}>
                        <Text>{hostingEvent.id}</Text>
                        <Text>{hostingEvent.date}</Text>
                        <Text>{hostingEvent.location}</Text>
                        <Text>{hostingEvent.max_guests}</Text>
                        <Text>{hostingEvent.description}</Text>
                        <Text>{hostingEvent.pendingStatus}</Text>
                    </View>
                );
            })}
            <View style={styles.actionContainer}>
                <ActionButton style={styles.backButton} onPress={handleCreateEvent} title="Create Event" />
            </View>
            <Text>Upcoming Events</Text>
            {upcomingEvents.map((upcomingEvent) => {
                return (
                    <View key={upcomingEvent.id}>
                        <Text>{upcomingEvent.id}</Text>
                        <Text>{upcomingEvent.date}</Text>
                        <Text>{upcomingEvent.location}</Text>
                        <Text>{upcomingEvent.max_guests}</Text>
                        <Text>{upcomingEvent.description}</Text>
                        <Text>{upcomingEvent.status}</Text>
                    </View>
                );
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightPurple
    }

});

export default HomeScreen;