import { useState, useEffect, React } from "react";
import { ScrollView, View, Text, RefreshControl, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { PanGestureHandler } from "react-native-gesture-handler";
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

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
        <SafeAreaView RefreshControl={<RefreshControl refreshing={event} onRefresh={onRefresh} />}>
            <Image></Image>
            <View>
                <Text>{event.date} at 8:00 pm</Text>
                <Text>Location: {event.location}</Text>
                <Text>Max Guests: {event.max_guests}</Text>
                <Text>Description: {event.description}</Text>
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleRequest} title="Request to Join" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%'
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    loginButton: {
        width: '48%'
    },
    error: {
        borderWidth: 1,
        borderColor: colors.redError
    },
    errorPassword: {
        marginTop: spacing.component,
        color: colors.redError
    }

});

export default ExploreScreen;