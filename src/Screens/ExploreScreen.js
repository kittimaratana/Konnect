import { useState, useEffect, React } from "react";
import { ScrollView, View, Text, RefreshControl, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { PanGestureHandler } from "react-native-gesture-handler";
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';
import Header from '../components/Header';

const ExploreScreen = () => {
    const [event, setEvent] = useState([]);
    const [host, setHost] = useState([]);
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

            const hostResponse = await axios.get(`http://localhost:5001/users/${eventResponse.data["user_id"]}`, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setEvent(eventResponse.data);
            setHost(hostResponse.data);
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

    console.log(`http://localhost:5001${host.picture}`)

    return (
        <SafeAreaView  style={styles.container} RefreshControl={<RefreshControl refreshing={event} onRefresh={onRefresh} />}>
            <Header/>
            <Image 
                style={{width: '100%', height: '68%'}}
                source={{uri: `http://localhost:5001${host.picture}`}}
            />
            <View>
                <Text>Location: {event.location}</Text>
                <Text>Date: {event.date}</Text>
                <Text>Max Guests: {event.max_guests}</Text>
                <Text>Description: {event.description}</Text>
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={postEvent} title="Request to Join" />
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
    }

});

export default ExploreScreen;