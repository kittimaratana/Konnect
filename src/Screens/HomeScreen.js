import { useState, useEffect, React } from "react";
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";

const HomeScreen = () => {
    const [hostingEvents, setHostingEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchEvents = async (event) => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const hostingEventsResponse = await axios.get("http://localhost:5001/events/user/hosting-events", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            const upcomingEventsResponse= await axios.get("http://localhost:5001/events/user/upcoming-events", {
                headers: {
                    authorization: "Bearer " + token,
                },
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
        // Fetching events for user
        console.log("first test");
        fetchEvents();
    }, []);


    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    return (
        <View>
            <Text>Home Screen</Text>
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
        </View>
    )
}

export default HomeScreen;