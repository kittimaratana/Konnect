import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';
import Header from '../components/Header';

const CreateEventScreen = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [eventDate, setEventDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const [description, setDescription] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    }

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setEventDate(selectedDate);
    };

    //add validation after
    const handleEvent = async (event) => {
        event.preventDefault();
        setHasSubmit(true);
        let fieldError = false;

        if ([eventDate, location, maxGuests, description].some(field => field === "")) {
            fieldError = true;
        }

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }

        if (fieldError === false) {
            try {

                console.log(`${[eventDate.toLocaleDateString('en-CA', options), location, maxGuests, description]}`);
                const token = await AsyncStorage.getItem('token');
                await axios.post("http://localhost:5001/events", {
                    date: eventDate.toLocaleDateString('en-CA', options),
                    location: location,
                    max_guests: maxGuests,
                    description: description
                }, {
                    headers: {
                        authorization: `Bear ${token}`
                    }
                });

                setSuccess(true);
                setError(null);
                navigation.navigate('Home');
            } catch (error) {
                setSuccess(false);
                setError(error.response.data);
                console.log(error.response.data);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Details: </Text>
            </View>
            <View style={styles.formContainer}>
            <Text style={form.input}>Date</Text>
                {showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={eventDate}
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity style={form.field} onPress={() => setShowDatePicker(true)} >
                    <Text >{eventDate.toDateString()}</Text>
                </TouchableOpacity>
                <Text style={form.input}>Location</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && location === "" ? styles.error : null,
                ]}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
                <Text style={form.input}>Max Guests</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && maxGuests === "" ? styles.error : null,
                ]}
                    value={maxGuests}
                    onChangeText={(text) => setMaxGuests(text)}
                />
                <Text style={form.input}>Description</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && description === "" ? styles.error : null,
                ]}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                    <ActionButton style={styles.registerButton} textColor={colors.white} onPress={handleEvent} title="Create Event" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '10%'
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    buttonPicture: {
        marginTop: spacing.component,
        color: colors.blue,
    },
    formPicture: {
        width: 250,
        height: 250
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component,
        paddingBottom: 100
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    registerButton: {
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

export default CreateEventScreen;