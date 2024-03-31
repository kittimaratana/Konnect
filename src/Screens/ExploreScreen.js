import { useState, useEffect, React } from "react";
import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { colors, fontSize, spacing } from '../styles/styles';
import Header from '../components/Header';
import UserImage from '../components/UserImage';
import EventDetails from '../components/EventDetails';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ExploreScreen = () => {
    const [event, setEvent] = useState([]);
    const [host, setHost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    //fetch event that user has not seen and event host infromation
    const fetchEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const eventResponse = await axios.get("http://localhost:5001/events/", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            const hostResponse = await axios.get(`http://localhost:5001/users/${eventResponse.data["user_id"]}`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setEvent(eventResponse.data);
            setHost(hostResponse.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
        }
    }

    //based on if user is interested (clicked request to join) or uninterested (left swipe), event attendance status is posted to the server
    //event status initially for guest can be uninterested or pending
    const postEvent = async (status) => {
        try {
            const token = await AsyncStorage.getItem('token')
            await axios.post(`http://localhost:5001/events/${event.id}`, {
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
        fetchEvent();
    }, []);

    const handleSwipeLeft = () => {
        postEvent("Uninterested");
    }

    const fling = Gesture.Fling().direction(Directions.LEFT).onEnd(handleSwipeLeft);

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    //display user image and event details for user to view
    return (
        <GestureDetector gesture={fling}>
            <SafeAreaView style={styles.container}>
                <Header />
                {event ? (
                    <>
                        <UserImage picture={host.picture} userId={host.id} width='100%' height='65%' />
                        <EventDetails
                            key={event.id}
                            location={event.location}
                            date={event.date}
                            description={event.description}
                            action={postEvent}
                            actionText="Request to Join"
                        />
                    </>
                ) : (
                    <View style={styles.noEventContainer}>
                        <MaterialCommunityIcons name="calendar" color={colors.gray} size={70} />
                        <Text style={styles.noEventTitle}>No events available currently</Text>
                        <Text style={styles.noEventAlert}>New events will appear here</Text>
                    </View>
                )}
            </SafeAreaView>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    formContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    noEventContainer: {
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noEventTitle: {
        color: colors.black,
        fontWeight: '800',
        fontSize: fontSize.fields,
        paddingTop: spacing.gutter,
        paddingBottom: spacing.lineHeight*2
    },
    noEventAlert: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.sectionHeader,
        color: colors.gray,
    }
});

export default ExploreScreen;