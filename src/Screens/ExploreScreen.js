import { useState, useEffect, React } from "react";
import { ScrollView, View, Text, RefreshControl, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { PanGestureHandler } from "react-native-gesture-handler";

const ExploreScreen = () => {
    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const eventResponse = await axios.get("http://localhost:5001/events/", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setEvent(eventResponse.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setIsLoading(false);
            setHasError(true);
        }
    }

    //status either Uninterested or Pending
    const postEvent = async (status) => {
        try {
            const token = await AsyncStorage.getItem('token')
            await axios.put("http://localhost:5001/events/", {
                event_id: event.id,
                status: status
            }, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setIsLoading(false);
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

    const onRefresh = () => {
        fetchEvent();
    }

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    return (

        <ScrollView RefreshControl={<RefreshControl refreshing={event} onRefresh={onRefresh} />}>
            <Text>{event.date}</Text>
            <Text>{event.location}</Text>
            <Text>{event.max_guests}</Text>
            <Text>{event.total_guests}</Text>
            <Text>{event.description}</Text>
        </ScrollView>
    )
}

/*
    <FlatList
        data={products}
        renderItem={({ item }) => renderProduct(item)}
        contentContainerStyle={{ gap: 10 }}
    />
*/

export default ExploreScreen;