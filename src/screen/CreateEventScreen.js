import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';
import Header from '../components/Header';


//create event screen 
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

    //if user clicks back button
    const handleBack = () => {
        navigation.goBack();
    }

    //user gets to select date of event and once selected the date picker hides
    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setEventDate(selectedDate);
    };

    //check guest validation so user inputs number and 2 and over guests
    const guestValidation = (maxGuests) => {
        const number = parseInt(maxGuests);

        if(number && number >= 2) {
            return (true)
        }
        return (false)
    }

    //check if the date is in the future
    const validDate = (eventDate) => {
        const currentDate = new Date();
        const millisecondsToDay = 1000 * 60 * 60 * 24;
        currentDate.setHours(0, 0, 0, 0); //ensure the timestamp starts at midnight

        if ((eventDate - currentDate) / millisecondsToDay < 0) {
            return (false)
        }
        return (true)
    }

    //add event to server
    const handleEvent = async (event) => {
        event.preventDefault();
        setHasSubmit(true);

        //check if event details input are correct
        let fieldError = false;

        if ([eventDate, location, maxGuests, description].some(field => field === "")) {
            fieldError = true;
        }

        if (!guestValidation(maxGuests)) {
            fieldError = true;
        }

        if (!validDate(eventDate)) {
            fieldError = true;
        }

        //post events if there are no issues and navigate back to the home screen
        if (fieldError === false) {
            try {
                const token = await AsyncStorage.getItem('token');
                await axios.post("http://localhost:5001/events", {
                    date: eventDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
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
                navigation.navigate('HomeScreen');
            } catch (error) {
                setSuccess(false);
                setError(error.response.data);
            }
        }
    }

    //UI to create a new event, form validation messages and customized button styling from ActionButton component
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Enter Event Details:</Text>
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
                    {hasSubmit && !validDate(eventDate) ? <Text style={styles.errorMessage}>*The event must be in the future</Text> : null}
                    <Text style={form.input}>Location</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && location === "" ? styles.errorInputBorder : null,
                    ]}
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        placeholder="Enter location"
                    />
                    {hasSubmit && location === "" ? <Text style={styles.errorMessage}>*Please enter a location</Text> : null}
                    <Text style={form.input}>Max Guests</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && maxGuests === "" ? styles.errorInputBorder : null,
                    ]}
                        value={String(maxGuests)}
                        onChangeText={(text) => setMaxGuests(text)}
                        placeholder="Enter max number of guests"
                    />
                    {hasSubmit && maxGuests == "" ? <Text style={styles.errorMessage}>*Please enter the number of guests</Text> : null}
                    {hasSubmit && maxGuests != "" && !guestValidation(maxGuests) ? <Text style={styles.errorMessage}>*Number of guests needs to be 2 or over</Text> : null}
                    <Text style={form.input}>Description</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && description === "" ? styles.errorInputBorder : null,
                    ]}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Enter event details"
                    />
                    {hasSubmit && description === "" ? <Text style={styles.errorMessage}>*Please enter the description</Text> : null}
                    <View style={styles.actionContainer}>
                        <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                        <ActionButton style={styles.createButton} textColor={colors.white} onPress={handleEvent} title="Create Event" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    title: {
        marginTop: spacing.margin * 2,
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component,
        paddingBottom: 20
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    createButton: {
        width: '48%'
    },
    errorInputBorder: {
        borderWidth: 1,
        borderColor: colors.redError
    },
    errorMessage: {
        marginTop: spacing.component,
        color: colors.redError,
        width: '100%',
        textAlign: 'left'
    },
});

export default CreateEventScreen;